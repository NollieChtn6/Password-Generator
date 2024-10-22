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
