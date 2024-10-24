import type { PasswordOptions } from "../@types/types";

export const generatePassword = ({
  nbOfCharacters,
  hasUpperCase,
  hasLowerCase,
  hasNumbers,
  hasSpecialCharacters,
}: PasswordOptions): string => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let selectedCharacters = "";
  if (hasLowerCase) selectedCharacters += lowercaseChars;
  if (hasUpperCase) selectedCharacters += uppercaseChars;
  if (hasNumbers) selectedCharacters += numberChars;
  if (hasSpecialCharacters) selectedCharacters += symbolChars;

  let newPassword = "";
  for (let i = 0; i < nbOfCharacters; i++) {
    const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
    newPassword += selectedCharacters[randomIndex];
  }

  return newPassword;
};

export const generateSecurePassword = ({
  nbOfCharacters,
  hasUpperCase,
  hasLowerCase,
  hasNumbers,
  hasSpecialCharacters,
}: PasswordOptions): string => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let selectedCharacters = "";
  if (hasLowerCase) selectedCharacters += lowercaseChars;
  if (hasUpperCase) selectedCharacters += uppercaseChars;
  if (hasNumbers) selectedCharacters += numberChars;
  if (hasSpecialCharacters) selectedCharacters += symbolChars;

  if (!selectedCharacters) {
    throw new Error("No character types selected for password generation.");
  }
  const randomValues = new Uint32Array(nbOfCharacters);
  crypto.getRandomValues(randomValues);
  // console.log(randomValues);

  let password = "";
  for (let i = 0; i < nbOfCharacters; i++) {
    const randomIndex = randomValues[i] % selectedCharacters.length;
    password += selectedCharacters[randomIndex];
  }
  return password;
};

export const checkPasswordStrength = (password: string): number => {
  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) score++;
  if (password.length > 20) score += 2;
  return score;
};
