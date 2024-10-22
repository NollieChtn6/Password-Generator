import { create } from "zustand";

import { generatePassword, checkPasswordStrength } from "../utils/passwordUtils";

export type PasswordOptions = {
  nbOfCharacters: number;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSymbols: boolean;
  hasNumbers: boolean;
  hasSpecialCharacters: boolean;
};

type PasswordStore = {
  passwordOptions: PasswordOptions;
  passwordStrength: number;
  setPasswordOptions: (options: Partial<PasswordOptions>) => void;
  generatePassword: () => string;
  assessPasswordStrength: (password: string) => number;
};

export const usePasswordStore = create<PasswordStore>((set) => ({
  passwordOptions: {
    nbOfCharacters: 12,
    hasUpperCase: false,
    hasLowerCase: true,
    hasSymbols: false,
    hasNumbers: false,
    hasSpecialCharacters: false,
  },
  passwordStrength: 0,
  setPasswordOptions: (updatedPasswordOptions) =>
    set((state) => ({
      passwordOptions: { ...state.passwordOptions, ...updatedPasswordOptions },
    })),

  generatePassword: () => {
    const passwordOptions: PasswordOptions = usePasswordStore.getState().passwordOptions;
    return generatePassword(passwordOptions);
  },
  assessPasswordStrength: (password: string) => {
    const strengthScore = checkPasswordStrength(password);
    set({ passwordStrength: strengthScore });
    return strengthScore;
  },
}));
