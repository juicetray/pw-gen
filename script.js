const lengthInput = document.getElementById("charLength");
const generateBtn = document.getElementById("generateBtn");
const includeUpper = document.getElementById("uppercaseChars");
const includeLower = document.getElementById("lowercaseChars");
const includeNum = document.getElementById("numChars");
const includeSymbol = document.getElementById("symbolChars");
const passwordContainer = document.getElementById("passwordContainer");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

const lowerCaseChars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const upperCaseChars = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const numChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "-"];

generateBtn.addEventListener("click", function () {
  let generatedPassword = "";
  let useUpper = includeUpper.checked;
  let useLower = includeLower.checked;
  let useNum = includeNum.checked;
  let useSymbol = includeSymbol.checked;

  if (useUpper) generatedPassword += upperCaseChars.join(",");
  if (useLower) generatedPassword += lowerCaseChars.join(",");
  if (useNum) generatedPassword += numChars.join(",");
  if (useSymbol) generatedPassword += symbolChars.join(",");

  let allChars = generatedPassword.split(",");
  let selectedChars = [];

  for (let i = 0; i < Number(lengthInput.value); i++) {
    let random = allChars[Math.floor(Math.random() * allChars.length)];
    selectedChars.push(random);
  }
  let finalPassword = selectedChars.join("");
  passwordContainer.textContent = finalPassword;
  const strength = getPasswordStrength(finalPassword);
  const strengthMessage = document.getElementById("strengthMessage");
  strengthMessage.textContent = `Strength: ${strength.level}`;
  strengthMessage.className = `text-sm h-5 ${strength.color}`;
});

copyBtn.addEventListener("click", () => {
  const password = passwordContainer.textContent;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      copyMessage.textContent = "Password copied!";
      setTimeout(() => (copyMessage.textContent = ""), 2000);
    })
    .catch(() => {
      copyMessage.textContent = "Failed to copy.";
    });
});

function getPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { level: "Weak", color: "text-red-500" };
  if (strength === 3) return { level: "Moderate", color: "text-yellow-400" };
  if (strength >= 4) return { level: "Strong", color: "text-green-400" };
}
