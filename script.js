const reels = document.getElementById("reels");
const charSlider = document.getElementById("charLength");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const includeUpper = document.getElementById("uppercaseChars");
const includeLower = document.getElementById("lowercaseChars");
const includeNum   = document.getElementById("numChars");
const includeSym   = document.getElementById("symbolChars");

const strengthEl = document.getElementById("strengthMessage");

const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz".split("");
const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numChars       = "0123456789".split("");
const symbolChars    = "!@#$%^&*-".split("");

function getLength() {
  const charInput = Number(charSlider.value);
  const charNum = Number.isFinite(charInput) ? Math.floor(charInput) : 5;
  const max = Number(charSlider.max) || 20;
  return Math.max(5, Math.min(max, charNum));
}

function createSlots() {
  const newReel = document.createElement("div");
  newReel.className = "reel";
  const reelChar = document.createElement("div");
  reelChar.className = "reel-char";
  reelChar.textContent = "•";
  newReel.appendChild(reelChar);
  return newReel;
}

function slotCalc() {
  const targetCount = getLength();
  const currentCount = reels.childElementCount;
  const diff = targetCount - currentCount;

  if (diff > 0) {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < diff; i++) {
      const reel = createSlots();
      frag.appendChild(reel);
    }
    reels.appendChild(frag);
  } else if (diff < 0) {
    for (let i = 0; i < Math.abs(diff); i++) {
      reels.lastElementChild.remove();
    }
  }
}

function buildPool() {
  let pool = [];
  if (includeUpper?.checked) pool = pool.concat(upperCaseChars);
  if (includeLower?.checked) pool = pool.concat(lowerCaseChars);
  if (includeNum?.checked)   pool = pool.concat(numChars);
  if (includeSym?.checked)   pool = pool.concat(symbolChars);
  return pool;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generatePassword(len) {
  const pool = buildPool();
  if (pool.length === 0) return "";

  const musts = [];
  if (includeUpper?.checked) musts.push(pick(upperCaseChars));
  if (includeLower?.checked) musts.push(pick(lowerCaseChars));
  if (includeNum?.checked)   musts.push(pick(numChars));
  if (includeSym?.checked)   musts.push(pick(symbolChars));

  const out = new Array(len);
  const seed = Math.min(len, musts.length);
  for (let i = 0; i < seed; i++) out[i] = musts[i];
  for (let i = seed; i < len; i++) out[i] = pick(pool);

  return shuffle(out).join("");
}

function displayPasswordOnReels(pwd) {
  slotCalc();
  const chars = pwd.split("");
  const nodes = reels.querySelectorAll(".reel-char");

  nodes.forEach((node, i) => {
    node.classList.remove("spinning");
    void node.offsetWidth;
    node.textContent = chars[i] ?? "•";
    node.classList.add("spinning");
  });
}

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return { level: "Weak", color: "#ef4444" };
  if (strength === 3) return { level: "Moderate", color: "#f59e0b" };
  return { level: "Strong", color: "#10b981" };
}

charSlider.addEventListener("input", () => {
  slotCalc();
  if (strengthEl) {
    strengthEl.textContent = "";
    strengthEl.removeAttribute("style");
  }
});

generateBtn?.addEventListener("click", () => {
  const len = getLength();
  const pwd = generatePassword(len);
  if (!pwd) {
    if (strengthEl) {
      strengthEl.textContent = "Select at least one character set.";
      strengthEl.style.color = "#ef4444";
    }
    return;
  }

  displayPasswordOnReels(pwd);

  if (strengthEl) {
    const s = getPasswordStrength(pwd);
    strengthEl.textContent = `Strength: ${s.level}`;
    strengthEl.style.color = s.color;
  }
});

copyBtn?.addEventListener("click", () => {
  const chars = Array.from(reels.querySelectorAll(".reel-char")).map(el => el.textContent).join("");
  if (chars && chars.includes("•") === false) {
    navigator.clipboard.writeText(chars)
      .then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 2000);
      })
      .catch(() => {
        copyBtn.textContent = "Failed";
        setTimeout(() => copyBtn.textContent = "Copy", 2000);
      });
  } else {
    copyBtn.textContent = "No password!";
    setTimeout(() => copyBtn.textContent = "Copy", 2000);
  }
});

slotCalc();
