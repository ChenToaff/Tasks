/**
 * Validates a password based on given criteria:
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one digit
 * - Minimum length of 8 characters
 */
export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};
