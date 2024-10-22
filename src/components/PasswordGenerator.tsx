import { Slider, type SliderChangeEvent } from "primereact/slider";
import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

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
    hasLowerCase: true,
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

  const generatePassword = (options: Password) => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let str = "";
    if (options.hasLowerCase) str += lowercaseChars;
    if (options.hasUpperCase) str += uppercaseChars;
    if (options.hasNumbers) str += numberChars;
    if (options.hasSpecialCharacters) str += symbolChars;

    let newPassword = "";
    for (let i = 0; i < options.nbOfCharacters; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      newPassword += str[randomIndex];
    }

    setGeneratedPassword(newPassword);
  };

  const handleGenerateClick = () => {
    generatePassword(passwordOptions);
  };

  const isOptionSelected =
    passwordOptions.hasLowerCase ||
    passwordOptions.hasUpperCase ||
    passwordOptions.hasNumbers ||
    passwordOptions.hasSpecialCharacters;

  return (
    <div className="generator-container">
      <h1 className="title">Random password generator</h1>

      <div className="password-container">
        <InputText
          type="text"
          id="password"
          value={generatedPassword || "Generate a password!"}
          disabled={true}
        />
        <Button type="button" onClick={() => navigator.clipboard.writeText(generatedPassword)}>
          Copy
        </Button>
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
            name="hasUpperCase"
            onChange={handleCheckBox}
            checked={passwordOptions.hasUpperCase}
          />
          <p>Include Uppercase</p>
        </div>
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
          <p>Include Special Characters</p>
        </div>
      </div>

      <div className="button-container">
        <Button type="button" onClick={handleGenerateClick} disabled={!isOptionSelected}>
          Generate password!
        </Button>
      </div>
    </div>
  );
}
