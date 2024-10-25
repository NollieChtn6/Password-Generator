import { describe, it, expect } from "vitest";
import { generateSecurePassword } from "../utils/passwordUtils";

import type { PasswordOptions } from "../@types/types";

describe("generateSecurePassword", () => {
  it("should generate a password with minimal required config, including 12 characters and lowercase only", () => {
    const selectedOptions: PasswordOptions = {
      nbOfCharacters: 12,
      hasUpperCase: false,
      hasLowerCase: true,
      hasNumbers: false,
      hasSpecialCharacters: false,
    };
    const passwordToTest = generateSecurePassword(selectedOptions);
    expect(passwordToTest.length).toBe(selectedOptions.nbOfCharacters);
    expect(passwordToTest).toMatch(/^[a-z]+$/);
  });

  it("should generate a password with lowercase and uppercase letters", () => {
    const selectedOptions: PasswordOptions = {
      nbOfCharacters: 12,
      hasUpperCase: true,
      hasLowerCase: true,
      hasNumbers: false,
      hasSpecialCharacters: false,
    };
    const passwordToTest = generateSecurePassword(selectedOptions);
    expect(passwordToTest.length).toBe(selectedOptions.nbOfCharacters);
    expect(passwordToTest).toMatch(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]+$/);
  });

  it("should generate a password with lowercase and uppercase letters and numbers", () => {
    const selectedOptions: PasswordOptions = {
      nbOfCharacters: 12,
      hasUpperCase: true,
      hasLowerCase: true,
      hasNumbers: true,
      hasSpecialCharacters: false,
    };
    const passwordToTest = generateSecurePassword(selectedOptions);
    expect(passwordToTest.length).toBe(selectedOptions.nbOfCharacters);
    expect(passwordToTest).toMatch(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/);
  });

  it("should generate a password including all options and containing 30 characters", () => {
    const selectedOptions: PasswordOptions = {
      nbOfCharacters: 30,
      hasUpperCase: true,
      hasLowerCase: true,
      hasNumbers: true,
      hasSpecialCharacters: true,
    };
    const passwordToTest = generateSecurePassword(selectedOptions);
    expect(passwordToTest.length).toBe(selectedOptions.nbOfCharacters);
    expect(passwordToTest).toMatch(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\[\]{}|;:,.<>?])[a-zA-Z0-9!@#$%^&*()_+\[\]{}|;:,.<>?]+$/,
    );
  });

  it("should throw an error if no option is selected", () => {
    const selectedOptions: PasswordOptions = {
      nbOfCharacters: 12,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumbers: false,
      hasSpecialCharacters: false,
    };
    expect(() => generateSecurePassword(selectedOptions)).toThrow(
      "No character types selected for password generation.",
    );
  });
});
