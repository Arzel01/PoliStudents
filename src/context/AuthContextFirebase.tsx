// Firebase Authentication Context
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  plan: 'free' | 'student' | 'personal' | 'enterprise';
  streak: {
    current: number;
    longest: number;
    lastActivity: Date | null;
  };
  points: {
    total: number;
    weekly: number;
  };
  createdAt: Date;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Create user profile in Firestore
async function createUserProfile(user: FirebaseUser, displayName: string): Promise<UserProfile> {
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: displayName,
    plan: 'free',
    streak: {
      current: 0,
      longest: 0,
      lastActivity: null,
    },
    points: {
      total: 0,
      weekly: 0,
    },
    createdAt: new Date(),
  };

  await setDoc(doc(db, 'users', user.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return profile;
}

// Get user profile from Firestore
async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      streak: {
        ...data.streak,
        lastActivity: data.streak?.lastActivity?.toDate() || null,
      },
    } as UserProfile;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    profile: null,
    loading: true,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        
        // Get profile from Firestore
        let profile = await getUserProfile(firebaseUser.uid);
        
        // If no profile exists, create one
        if (!profile) {
          profile = await createUserProfile(firebaseUser, firebaseUser.displayName || 'Usuario');
        }
        
        setState({
          isAuthenticated: true,
          user,
          profile,
          loading: false,
        });
      } else {
        setState({
          isAuthenticated: false,
          user: null,
          profile: null,
          loading: false,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      // onAuthStateChanged will handle the state update
    } catch (error) {
      setState((s) => ({ ...s, loading: false }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: data.username,
      });
      
      // Create profile in Firestore
      await createUserProfile(userCredential.user, data.username);
      
      // onAuthStateChanged will handle the state update
    } catch (error) {
      setState((s) => ({ ...s, loading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    // onAuthStateChanged will handle the state update
  }, []);

  const refreshProfile = useCallback(async () => {
    if (state.user) {
      const profile = await getUserProfile(state.user.uid);
      setState((s) => ({ ...s, profile }));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
