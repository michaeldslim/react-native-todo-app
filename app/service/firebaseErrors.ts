export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/email-already-exists':
      return 'The provided email is already in use by an existing user.';
    case 'auth/user-not-found':
      return 'There is no user corresponding to the given email.';
    case 'auth/missing-password':
      return 'The password is required.';
    case 'auth/invalid-password':
      return 'The password is invalid for the given email, or the account does not have a password set.';
    case 'auth/invalid-credential':
      return 'The password is invalid for the given email, or the account does not have a password set.';
    case 'auth/weak-password':
      return 'The password should be at least 6 characters long.';
    default:
      return 'An unknown error occurred. Please try again.';
  }
};
