import { Slider, type SliderChangeEvent } from "primereact/slider";
import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import { useState } from "react";

type Password = {
  nbOfCharacters: number;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSymbols: boolean;
  hasNumbers: boolean;
  hasSpecialCharacters: boolean;
};

export function PasswordGenerator() {
  const [passwordOptions, setPasswordOptions] = useState<Password>({
    nbOfCharacters: 12,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSymbols: false,
    hasNumbers: false,
    hasSpecialCharacters: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target;
    setPasswordOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSlider = (e: SliderChangeEvent) => {
    const value = e.value as number;
    setPasswordOptions((prev) => ({
      ...prev,
      nbOfCharacters: value,
    }));
  };

  // Code snippet: https://www.geeksforgeeks.org/how-to-generate-random-password-in-react/

  const generatePassword = (options: Password) => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let str = "abcdefghijklmnopqrstuvwxyz";
    if (options.hasLowerCase) str += lowercaseChars;
    if (options.hasUpperCase) str += uppercaseChars;
    if (options.hasNumbers) str += numberChars;
    if (options.hasSpecialCharacters) str += symbolChars;

    if (str === "") {
      str = lowercaseChars;
    }
    let newPassword = "";
    for (let i = 0; i < passwordOptions.nbOfCharacters; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      newPassword += str[randomIndex];
    }

    setGeneratedPassword(newPassword);
  };

  const handleGenerateClick = () => {
    generatePassword(passwordOptions);
  };

  return (
    <div className="generator-container">
      <h1 className="title">Random password generator</h1>

      <div className="password-container">
        <label htmlFor="password">Your password</label>
        <div>
          <input
            type="text"
            id="password"
            value={generatedPassword || "Generate a password!"}
            disabled={true}
          />
          <button type="button">Copy</button>
        </div>
      </div>

      <div className="slider-container" style={{ position: "relative" }}>
        <label htmlFor="slider">Number of characters: {passwordOptions.nbOfCharacters}</label>
        <Slider
          min={12}
          max={50}
          value={passwordOptions.nbOfCharacters}
          onChange={handleSlider}
          step={1}
        />
      </div>

      <div className="options-container">
        <div className="option">
          <Checkbox
            name="hasLowerCase"
            onChange={handleCheckBox}
            checked={passwordOptions.hasLowerCase}
          />
          <p>Include Lowercase</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasUpperCase"
            onChange={handleCheckBox}
            checked={passwordOptions.hasUpperCase}
          />
          <p>Include Upperase</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasNumbers"
            onChange={handleCheckBox}
            checked={passwordOptions.hasNumbers}
          />
          <p>Include Numbers</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasSpecialCharacters"
            onChange={handleCheckBox}
            checked={passwordOptions.hasSpecialCharacters}
          />
          <p>Include special characters</p>
        </div>
      </div>

      <div className="button-container">
        <button type="button" onClick={handleGenerateClick}>
          Generate password!
        </button>
      </div>
    </div>
  );
}
