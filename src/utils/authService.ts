import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail,
  linkWithCredential,
} from 'firebase/auth';
import type { UserCredential } from 'firebase/auth';
import { auth } from './firebase';

export const loginWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (err: any) {
    if (err.code === 'auth/account-exists-with-different-credential') {
      const email = err.customData?.email;
      const pendingCred = GoogleAuthProvider.credentialFromError(err);

      if (!email || !pendingCred) throw err;

      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes('password')) {
        const password = prompt(`An account with ${email} already exists. Enter your password to link Google login:`);

        if (!password) throw new Error('Password is required to link accounts.');

        const emailLogin = await signInWithEmailAndPassword(auth, email, password);
        await linkWithCredential(emailLogin.user, pendingCred);

        return {
          ...emailLogin,
          providerId: 'google.com',
          operationType: 'link',
        };
      }

      throw err;
    } else {
      throw err;
    }
  }
};

export const registerWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async (): Promise<void> => {
  return await signOut(auth);
};
