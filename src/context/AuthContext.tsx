import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { auth, db, loginWithGoogle, logout as fbLogout, handleFirestoreError, OperationType } from '../firebase';
import { UserProfileDoc, UserFlashcardItem, ExamResultItem, UserStudyNoteItem } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfileDoc | null;
  loading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfileDoc>) => Promise<void>;

  // User Flashcards persistence
  userFlashcards: UserFlashcardItem[];
  createUserFlashcard: (
    data: Omit<UserFlashcardItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => Promise<string>;
  updateUserFlashcard: (id: string, data: Partial<UserFlashcardItem>) => Promise<void>;
  deleteUserFlashcard: (id: string) => Promise<void>;

  // Exam Results persistence
  examResults: ExamResultItem[];
  saveExamResult: (
    data: Omit<ExamResultItem, 'id' | 'userId' | 'completedAt'>
  ) => Promise<string>;

  // Engineering Notes persistence
  userNotes: UserStudyNoteItem[];
  createNote: (data: { title: string; content: string; category?: string }) => Promise<string>;
  updateNote: (id: string, data: Partial<UserStudyNoteItem>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileDoc | null>(null);
  const [userFlashcards, setUserFlashcards] = useState<UserFlashcardItem[]>([]);
  const [examResults, setExamResults] = useState<ExamResultItem[]>([]);
  const [userNotes, setUserNotes] = useState<UserStudyNoteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserProfile(null);
        setUserFlashcards([]);
        setExamResults([]);
        setUserNotes([]);
        setLoading(false);
        return;
      }

      // Initialize or fetch user profile document
      const userRef = doc(db, 'users', currentUser.uid);
      try {
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          const newProfile: UserProfileDoc = {
            id: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Ingénieur Réseau',
            photoURL: currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
            role: 'Lead Network Architect & Cloud Ops',
            streakDays: 14,
            lastStudyDate: new Date().toISOString().split('T')[0],
            precisionGlobal: 86.5,
            labsCompleted: 38,
            targetExam: '350-401 ENCOR',
            studyHoursTotal: 142,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
        } else {
          setUserProfile(snap.data() as UserProfileDoc);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Real-time listener for user profile
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfileDoc);
        }
      },
      (err) => {
        handleFirestoreError(err, OperationType.GET, `users/${user.uid}`);
      }
    );
    return () => unsubscribeProfile();
  }, [user]);

  // Real-time listener for user flashcards
  useEffect(() => {
    if (!user) return;
    const flashcardsRef = collection(db, 'users', user.uid, 'flashcards');
    const q = query(flashcardsRef, orderBy('createdAt', 'desc'));
    const unsubscribeFlashcards = onSnapshot(
      q,
      (snapshot) => {
        const items: UserFlashcardItem[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as UserFlashcardItem);
        });
        setUserFlashcards(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/flashcards`);
      }
    );
    return () => unsubscribeFlashcards();
  }, [user]);

  // Real-time listener for exam results
  useEffect(() => {
    if (!user) return;
    const examResultsRef = collection(db, 'users', user.uid, 'examResults');
    const q = query(examResultsRef, orderBy('completedAt', 'desc'));
    const unsubscribeResults = onSnapshot(
      q,
      (snapshot) => {
        const items: ExamResultItem[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as ExamResultItem);
        });
        setExamResults(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/examResults`);
      }
    );
    return () => unsubscribeResults();
  }, [user]);

  // Real-time listener for study notes
  useEffect(() => {
    if (!user) return;
    const notesRef = collection(db, 'users', user.uid, 'notes');
    const q = query(notesRef, orderBy('updatedAt', 'desc'));
    const unsubscribeNotes = onSnapshot(
      q,
      (snapshot) => {
        const items: UserStudyNoteItem[] = [];
        snapshot.forEach((d) => {
          items.push(d.data() as UserStudyNoteItem);
        });
        setUserNotes(items);
      },
      (err) => {
        handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/notes`);
      }
    );
    return () => unsubscribeNotes();
  }, [user]);

  const signIn = async () => {
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la connexion Google');
      throw err;
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      await fbLogout();
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la déconnexion');
      throw err;
    }
  };

  const updateProfile = async (data: Partial<UserProfileDoc>) => {
    if (!user) throw new Error('Utilisateur non connecté');
    const userRef = doc(db, 'users', user.uid);
    try {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(userRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const createUserFlashcard = async (
    data: Omit<UserFlashcardItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Promise<string> => {
    if (!user) throw new Error('Utilisateur non connecté');
    const id = `fc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const cardRef = doc(db, 'users', user.uid, 'flashcards', id);
    const now = new Date().toISOString();
    const newCard: UserFlashcardItem = {
      ...data,
      id,
      userId: user.uid,
      tags: data.tags || [],
      reviewCount: 0,
      state: data.state || 'new',
      difficulty: data.difficulty || 'Moyen',
      createdAt: now,
      updatedAt: now,
    };
    try {
      await setDoc(cardRef, newCard);
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/flashcards/${id}`);
    }
  };

  const updateUserFlashcard = async (id: string, data: Partial<UserFlashcardItem>) => {
    if (!user) throw new Error('Utilisateur non connecté');
    const cardRef = doc(db, 'users', user.uid, 'flashcards', id);
    try {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(cardRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/flashcards/${id}`);
    }
  };

  const deleteUserFlashcard = async (id: string) => {
    if (!user) throw new Error('Utilisateur non connecté');
    const cardRef = doc(db, 'users', user.uid, 'flashcards', id);
    try {
      await deleteDoc(cardRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/flashcards/${id}`);
    }
  };

  const saveExamResult = async (
    data: Omit<ExamResultItem, 'id' | 'userId' | 'completedAt'>
  ): Promise<string> => {
    if (!user) throw new Error('Utilisateur non connecté');
    const id = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const resRef = doc(db, 'users', user.uid, 'examResults', id);
    const now = new Date().toISOString();
    const resultItem: ExamResultItem = {
      ...data,
      id,
      userId: user.uid,
      completedAt: now,
    };
    try {
      await setDoc(resRef, resultItem);

      // Increment user streak and stats in background
      if (userProfile) {
        const newLabs = data.passed ? (userProfile.labsCompleted || 0) + 1 : userProfile.labsCompleted;
        updateProfile({
          labsCompleted: newLabs,
          lastStudyDate: now.split('T')[0],
        }).catch((e) => console.warn('Background profile update:', e));
      }

      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/examResults/${id}`);
    }
  };

  const createNote = async (data: {
    title: string;
    content: string;
    category?: string;
  }): Promise<string> => {
    if (!user) throw new Error('Utilisateur non connecté');
    const id = `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const noteRef = doc(db, 'users', user.uid, 'notes', id);
    const now = new Date().toISOString();
    const newNote: UserStudyNoteItem = {
      id,
      userId: user.uid,
      title: data.title,
      content: data.content,
      category: data.category || 'Général',
      createdAt: now,
      updatedAt: now,
    };
    try {
      await setDoc(noteRef, newNote);
      return id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/notes/${id}`);
    }
  };

  const updateNote = async (id: string, data: Partial<UserStudyNoteItem>) => {
    if (!user) throw new Error('Utilisateur non connecté');
    const noteRef = doc(db, 'users', user.uid, 'notes', id);
    try {
      const payload = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(noteRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}/notes/${id}`);
    }
  };

  const deleteNote = async (id: string) => {
    if (!user) throw new Error('Utilisateur non connecté');
    const noteRef = doc(db, 'users', user.uid, 'notes', id);
    try {
      await deleteDoc(noteRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/notes/${id}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
        signIn,
        signOut,
        updateProfile,
        userFlashcards,
        createUserFlashcard,
        updateUserFlashcard,
        deleteUserFlashcard,
        examResults,
        saveExamResult,
        userNotes,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
