import { create } from "zustand";

import { generateSecurePassword, checkPasswordStrength } from "../utils/passwordUtils";
import type { PasswordOptions } from "../@types/types";

type PasswordStore = {
  passwordOptions: PasswordOptions;
  passwordStrength: number;
  setPasswordOptions: (options: Partial<PasswordOptions>) => void;
  generateSecurePassword: () => string;
  assessPasswordStrength: (password: string) => number;
};

export const usePasswordStore = create<PasswordStore>((set) => ({
  passwordOptions: {
    nbOfCharacters: 12,
    hasUpperCase: false,
    hasLowerCase: true,
    hasNumbers: false,
    hasSpecialCharacters: false,
  },
  passwordStrength: 0,
  setPasswordOptions: (updatedPasswordOptions) =>
    set((state) => ({
      passwordOptions: { ...state.passwordOptions, ...updatedPasswordOptions },
    })),

  // generatePassword: () => {
  //   const passwordOptions: PasswordOptions = usePasswordStore.getState().passwordOptions;
  //   return generatePassword(passwordOptions);
  // },
  generateSecurePassword: (): string => {
    const passwordOptions: PasswordOptions = usePasswordStore.getState().passwordOptions;
    return generateSecurePassword(passwordOptions);
  },
  assessPasswordStrength: (password: string) => {
    const strengthScore = checkPasswordStrength(password);
    set({ passwordStrength: strengthScore });
    return strengthScore;
  },
}));
