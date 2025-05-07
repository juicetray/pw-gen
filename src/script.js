let lengthInput = document.getElementById("charLength");
let generateBtn = document.getElementById("generateBtn");
let includeUpper = document.getElementById("uppercaseChars");
let includeLower = document.getElementById("lowercaseChars");
let includeNum = document.getElementById("numChars");
let includeSymbol = document.getElementById("symbolChars");
let passwordContainer = document.getElementById("passwordContainer");


const lowerCaseChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const upperCaseChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const numChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "-"];


generateBtn.addEventListener("click", function() {
    let generatedPassword = ""
    let useUpper = includeUpper.checked;
    let useLower = includeLower.checked;
    let useNum = includeNum.checked;
    let useSymbol = includeSymbol.checked;
    

    if (useUpper) generatedPassword += upperCaseChars.join(",");
    if (useLower) generatedPassword += lowerCaseChars.join(",");
    if (useNum) generatedPassword += numChars.join(",");
    if (useSymbol) generatedPassword += symbolChars.join(",");



    let 