import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import UI components
import { Button } from "primereact/button";
import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Slider, type SliderChangeEvent } from "primereact/slider";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";

// import icons
import { Files } from "lucide-react";

// import custom elements
import { usePasswordStore } from "../store/passwordStore";

export function PasswordGenerator() {
  const { passwordOptions, setPasswordOptions, generateSecurePassword, assessPasswordStrength } =
    usePasswordStore();
  const toast = useRef<Toast>(null);

  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const [_passwordIsCopied, setPasswordIsCopied] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const onCopyPassword = () => {
    setPasswordIsCopied(true);
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Password copied to clipboard!",
      life: 3000,
    });
    setTimeout(() => setPasswordIsCopied(false), 3000);
  };

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target;
    setPasswordOptions({ [name]: checked });
  };

  const handleSlider = (e: SliderChangeEvent) => {
    const value = e.value as number;
    setPasswordOptions({ nbOfCharacters: value });
  };

  const handleGenerateClick = () => {
    const newPassword = generateSecurePassword();
    setGeneratedPassword(newPassword);
  };

  const isOptionSelected =
    passwordOptions.hasLowerCase ||
    passwordOptions.hasUpperCase ||
    passwordOptions.hasNumbers ||
    passwordOptions.hasSpecialCharacters;

  const strengthPercentage = passwordStrength * 20;

  useEffect(() => {
    if (generatedPassword) {
      const strength = assessPasswordStrength(generatedPassword);
      setPasswordStrength(strength);
    }
  }, [generatedPassword, assessPasswordStrength]);

  const getProgressBarStep = () => {
    if (passwordStrength <= 2) return "weak";
    if (passwordStrength <= 4) return "medium";
    return "strong";
  };

  return (
    <div className="generator-container">
      <h1 className="title">Random Password Generator</h1>

      <div className="password-container">
        <InputText
          type="text"
          id="password"
          value={generatedPassword}
          placeholder="Generate a password!"
          className="password-input"
          readOnly={true}
        />
        <CopyToClipboard text={generatedPassword} onCopy={onCopyPassword}>
          <Button
            type="button"
            onClick={() => navigator.clipboard.writeText(generatedPassword)}
            className="btn"
            tooltip="Click to copy password"
            tooltipOptions={{
              showDelay: 1000,
              hideDelay: 300,
              position: "bottom",
            }}
          >
            <Files />
          </Button>
        </CopyToClipboard>
      </div>

      <div className="strength-container">
        <p className="label-text">Password Strength: {getProgressBarStep()}</p>
        <ProgressBar
          value={strengthPercentage}
          showValue={false}
          className={`password-strength-bar ${getProgressBarStep()}`}
        />
      </div>

      <div className="slider-container" style={{ position: "relative" }}>
        <label htmlFor="slider" className="label-text">
          Number of characters: {passwordOptions.nbOfCharacters}
        </label>
        <Slider
          min={12}
          max={50}
          value={passwordOptions.nbOfCharacters}
          onChange={handleSlider}
          step={1}
        />
      </div>

      <div className="options-container">
        <p className="label-text">Also include:</p>
        <div className="option">
          <Checkbox
            name="hasUpperCase"
            onChange={handleCheckBox}
            checked={passwordOptions.hasUpperCase}
            className="checkbox"
          />
          <p className="label-text">... uppercase letters</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasLowerCase"
            onChange={handleCheckBox}
            checked={passwordOptions.hasLowerCase}
            className="checkbox"
          />
          <p className="label-text">... lowercase letters</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasNumbers"
            onChange={handleCheckBox}
            checked={passwordOptions.hasNumbers}
            className="checkbox"
          />
          <p className="label-text">... numbers</p>
        </div>
        <div className="option">
          <Checkbox
            name="hasSpecialCharacters"
            onChange={handleCheckBox}
            checked={passwordOptions.hasSpecialCharacters}
            className="checkbox"
          />
          <p className="label-text">... special characters</p>
        </div>
      </div>

      <div className="button-container">
        <Button
          type="button"
          onClick={handleGenerateClick}
          disabled={!isOptionSelected}
          className="btn"
        >
          Generate password!
        </Button>
      </div>
      <Tooltip />
      <Toast ref={toast} />
    </div>
  );
}
