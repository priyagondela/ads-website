import { useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/auth';

/**
 * Custom hook that tracks the current Firebase auth state.
 *
 * @returns {{ user: import('firebase/auth').User | null, loading: boolean }}
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
