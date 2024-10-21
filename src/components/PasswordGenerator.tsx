import { Slider } from "primereact/slider";
import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import { useState } from "react";

export function PasswordGenerator() {
  const [value, setValue] = useState<number>(12);

  const [options, setOptions] = useState({
    includeUppercase: false,
    includeNumbers: false,
    includeSpecialChars: false,
  });

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  return (
    <div className="generator-container">
      <h1 className="title">Random password generator</h1>

      <div className="password-container">
        <label htmlFor="password">Your password</label>
        <div>
          <input type="text" id="password" value={"my password"} disabled={true} />
          <button type="button">Copy</button>
        </div>
      </div>

      <div className="slider-container" style={{ position: "relative" }}>
        <label htmlFor="slider">Number of characters: {value}</label>
        <Slider
          min={12}
          max={50}
          value={value}
          onChange={(e) => setValue(e.value as number)}
          step={1}
        />
      </div>

      <div className="options-container">
        <div className="option">
          <Checkbox
            name="includeUppercase"
            onChange={handleCheckBox}
            checked={options.includeUppercase}
          />
          <p>Include capital letters</p>
        </div>
        <div className="option">
          <Checkbox
            name="includeNumbers"
            onChange={handleCheckBox}
            checked={options.includeNumbers}
          />
          <p>Include numbers</p>
        </div>
        <div className="option">
          <Checkbox
            name="includeSpecialChars"
            onChange={handleCheckBox}
            checked={options.includeSpecialChars}
          />
          <p>Include special characters</p>
        </div>
      </div>

      <div className="button-container">
        <button type="button">Generate password!</button>
      </div>
    </div>
  );
}
