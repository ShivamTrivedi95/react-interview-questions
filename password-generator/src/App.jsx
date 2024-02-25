import { useEffect, useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import "./App.css";
import PasswordStrengthIndicator from "./component/PasswordStrengthChecker";
import Button from "./component/Button";
import Checkbox from "./component/Checkbox";

function App() {
  const [length, setLength] = useState(4);
  const [isCopied, setIsCopied] = useState(false);
  const [checkBoxData, setCheckboxData] = useState([
    { title: "Includes Uppercase Letters", status: false },
    { title: "Includes Lowercase Letters", status: false },
    { title: "Includes Numbers", status: false },
    { title: "Includes Symbols", status: true },
  ]);

  const handleCheckboxChange = (index) => {
    const _checkboxData = [...checkBoxData];

    _checkboxData[index].status = !_checkboxData[index].status;

    console.log(_checkboxData);
    setCheckboxData(_checkboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);

      //reset clipboard
      navigator.clipboard.writeText("");
    }, 1500);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  return (
    <div className="card-container">
      {password ? (
        <div className="header">
          <span className="password-text">{password}</span>
          <Button title={`${isCopied ? "Copied!" : "Copy"}`} onClick={() => handleCopy()} customClassName="copy-button" />
        </div>
      ) : null}

      <div className="char-length-container">
        <span className="char-length-text-wrapper">
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input id="character_range" name="character_range" type="range" min="4" max="20" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>

      <div className="checkbox-wrapper">
        {checkBoxData.map((checkbox, index) => {
          return <Checkbox key={index} title={checkbox.title} status={checkbox.status} onChange={() => handleCheckboxChange(index)} />;
        })}
      </div>

      <PasswordStrengthIndicator password={password} />

      {errorMessage ? <div className="error-handler">{errorMessage}</div> : null}

      <Button customClassName="generate-password" title="Generate Password" onClick={() => generatePassword(checkBoxData, length)} />
    </div>
  );
}

export default App;
