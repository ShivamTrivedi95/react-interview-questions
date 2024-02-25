import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkBoxData, length) => {
    console.log(checkBoxData, length);
    let charSet = "",
      generatedPassword = "";

    const selectedOptions = checkBoxData.filter((checkbox) => checkbox.status);

    if (selectedOptions.length === 0) {
      setErrorMessage("Select atleast one option");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
        console.log("option", option)
      switch (option.title) {
        case "Includes Uppercase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Includes Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Includes Numbers":
          charSet += "0123456789";
          break;
        case "Includes Symbols":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    console.log(charSet)
    for (let i = 0; i < length; i++) {
        
      const randomIndex = Math.floor(Math.random() * charSet.length);
      console.log("randomIndex", randomIndex)
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return {
    password,
    errorMessage,
    generatePassword,
  };
};

export default usePasswordGenerator;
