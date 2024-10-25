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
});
