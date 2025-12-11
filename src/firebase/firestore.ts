// Firestore services for user data management
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';

// ==================== USER PROFILE ====================

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  plan: 'free' | 'student' | 'personal' | 'enterprise';
  streak: {
    current: number;
    longest: number;
    lastActivity: Timestamp | null;
  };
  points: {
    total: number;
    weekly: number;
  };
  createdAt: Timestamp;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, data);
}

export async function updateStreak(uid: string) {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) return;
  
  const userData = userSnap.data();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = userData.streak?.lastActivity?.toDate();
  let newStreak = userData.streak?.current || 0;
  
  if (lastActivity) {
    const lastDate = new Date(lastActivity);
    lastDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Already studied today, no change
      return userData.streak;
    } else if (diffDays === 1) {
      // Consecutive day
      newStreak += 1;
    } else {
      // Streak broken
      newStreak = 1;
    }
  } else {
    // First study session
    newStreak = 1;
  }
  
  const newLongest = Math.max(newStreak, userData.streak?.longest || 0);
  
  await updateDoc(userRef, {
    'streak.current': newStreak,
    'streak.longest': newLongest,
    'streak.lastActivity': serverTimestamp(),
  });
  
  return { current: newStreak, longest: newLongest };
}

export async function addPoints(uid: string, points: number) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    'points.total': increment(points),
    'points.weekly': increment(points),
  });
}

// ==================== STUDY SESSIONS ====================

export interface StudySession {
  id?: string;
  userId: string;
  courseId: string;
  unitId: string;
  lessonId: string;
  startTime: Timestamp;
  endTime?: Timestamp;
  duration: number; // in minutes
  technique: 'pomodoro' | 'spaced' | 'active';
  completed: boolean;
}

export async function createStudySession(session: Omit<StudySession, 'id'>) {
  const sessionsRef = collection(db, 'studySessions');
  const docRef = await addDoc(sessionsRef, {
    ...session,
    startTime: serverTimestamp(),
  });
  return docRef.id;
}

export async function completeStudySession(sessionId: string, duration: number) {
  const sessionRef = doc(db, 'studySessions', sessionId);
  await updateDoc(sessionRef, {
    endTime: serverTimestamp(),
    duration,
    completed: true,
  });
}

export async function getUserStudySessions(userId: string, limitCount = 20) {
  const sessionsRef = collection(db, 'studySessions');
  const q = query(
    sessionsRef,
    where('userId', '==', userId),
    orderBy('startTime', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as StudySession[];
}

// ==================== COURSE PROGRESS ====================

export interface CourseProgress {
  id?: string;
  userId: string;
  courseId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>; // quizId -> score
  lastAccessedAt: Timestamp;
}

export async function getOrCreateProgress(userId: string, courseId: string): Promise<CourseProgress> {
  const progressRef = doc(db, 'progress', `${userId}_${courseId}`);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    return { id: progressSnap.id, ...progressSnap.data() } as CourseProgress;
  }
  
  // Create new progress document
  const newProgress: Omit<CourseProgress, 'id'> = {
    userId,
    courseId,
    completedLessons: [],
    completedQuizzes: [],
    quizScores: {},
    lastAccessedAt: Timestamp.now(),
  };
  
  await setDoc(progressRef, {
    ...newProgress,
    lastAccessedAt: serverTimestamp(),
  });
  
  return { id: progressRef.id, ...newProgress };
}

export async function markLessonComplete(userId: string, courseId: string, lessonId: string) {
  const progressRef = doc(db, 'progress', `${userId}_${courseId}`);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    const data = progressSnap.data();
    const completedLessons = data.completedLessons || [];
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      await updateDoc(progressRef, {
        completedLessons,
        lastAccessedAt: serverTimestamp(),
      });
    }
  } else {
    await setDoc(progressRef, {
      userId,
      courseId,
      completedLessons: [lessonId],
      completedQuizzes: [],
      quizScores: {},
      lastAccessedAt: serverTimestamp(),
    });
  }
}

export async function saveQuizScore(userId: string, courseId: string, quizId: string, score: number) {
  const progressRef = doc(db, 'progress', `${userId}_${courseId}`);
  const progressSnap = await getDoc(progressRef);
  
  if (progressSnap.exists()) {
    const data = progressSnap.data();
    const completedQuizzes = data.completedQuizzes || [];
    const quizScores = data.quizScores || {};
    
    if (!completedQuizzes.includes(quizId)) {
      completedQuizzes.push(quizId);
    }
    quizScores[quizId] = Math.max(quizScores[quizId] || 0, score);
    
    await updateDoc(progressRef, {
      completedQuizzes,
      quizScores,
      lastAccessedAt: serverTimestamp(),
    });
  } else {
    await setDoc(progressRef, {
      userId,
      courseId,
      completedLessons: [],
      completedQuizzes: [quizId],
      quizScores: { [quizId]: score },
      lastAccessedAt: serverTimestamp(),
    });
  }
}

export async function getUserProgress(userId: string): Promise<CourseProgress[]> {
  const progressRef = collection(db, 'progress');
  const q = query(progressRef, where('userId', '==', userId));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as CourseProgress[];
}

// ==================== LEADERBOARD ====================

export async function getLeaderboard(limitCount = 10) {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    orderBy('points.weekly', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    uid: doc.id,
    displayName: doc.data().displayName,
    points: doc.data().points,
    streak: doc.data().streak,
  }));
}

// Reset weekly points (run via Firebase Functions or manually)
export async function resetWeeklyPoints() {
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);
  
  const updates = querySnapshot.docs.map(docSnap => 
    updateDoc(doc(db, 'users', docSnap.id), {
      'points.weekly': 0,
    })
  );
  
  await Promise.all(updates);
}
