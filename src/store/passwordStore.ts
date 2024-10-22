import { create } from "zustand";

import { generatePassword } from "../utils/generatePassword";

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
  setPasswordOptions: (options: Partial<PasswordOptions>) => void;
  generatePassword: () => string;
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
  setPasswordOptions: (updatedPasswordOptions) =>
    set((state) => ({
      passwordOptions: { ...state.passwordOptions, ...updatedPasswordOptions },
    })),

  generatePassword: () => {
    const passwordOptions: PasswordOptions = usePasswordStore.getState().passwordOptions;
    return generatePassword(passwordOptions);
  },
}));
