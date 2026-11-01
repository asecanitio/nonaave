// =====================================================
// DOM ELEMENTS
// =====================================================
const pages = document.querySelectorAll(".page");
const startBtn = document.getElementById("startBtn");
const stayBtn = document.getElementById("stayBtn");

const pin1 = document.getElementById("pin1");
const pin2 = document.getElementById("pin2");
const passwordBox = document.getElementById("passwordBox");
const enterBtn = document.getElementById("enterBtn");
const wrongText = document.getElementById("wrongText");

const envelope = document.getElementById("envelope");
const menuCard = document.querySelector(".menu-card");
const letterBtn = document.getElementById("letterBtn");
const answerBtn = document.getElementById("answerBtn");
const backBtn = document.querySelector(".backBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answerPage = document.getElementById("answerPage");

const backToPage3 = document.getElementById("backToPage3");
const backToAnswer = document.getElementById("backToAnswer");

// =====================================================
// PAGE NAVIGATION
// =====================================================
function showPage(id) {
    pages.forEach(page => page.classList.remove("active"));
    const targetPage = document.getElementById(id);
    if (targetPage) {
        targetPage.classList.add("active");
    }
}

// =====================================================
// PAGE 1 EVENTS
// =====================================================
startBtn.addEventListener("click", () => {
    showPage("page2");
    setTimeout(() => pin1.focus(), 400);
});

stayBtn.addEventListener("click", () => {
    stayBtn.style.transform = "translateX(5px)";
    setTimeout(() => stayBtn.style.transform = "translateX(-5px)", 100);
    setTimeout(() => stayBtn.style.transform = "translateX(0)", 200);
});

// =====================================================
// PIN INPUT LOGIC
// =====================================================
pin1.addEventListener("input", () => {
    pin1.value = pin1.value.replace(/\D/g, "");
    if (pin1.value.length === 1) {
        pin2.focus();
    }
});

pin2.addEventListener("input", () => {
    pin2.value = pin2.value.replace(/\D/g, "");
});

pin2.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && pin2.value === "") {
        pin1.focus();
    }
});

enterBtn.addEventListener("click", checkPassword);

function checkPassword() {
    const password = pin1.value + pin2.value;

    if (password === "22") {
        wrongText.style.display = "none";
        showPage("page3");
        pin1.value = "";
        pin2.value = "";
    } else {
        wrongText.style.display = "block";
        passwordBox.classList.add("shake");
        
        setTimeout(() => {
            passwordBox.classList.remove("shake");
        }, 400);

        pin1.value = "";
        pin2.value = "";
        pin1.focus();
    }
}

// =====================================================
// PAGE 3: ENVELOPE & MENU
// =====================================================
envelope.addEventListener("click", () => {
    if (!envelope.classList.contains("open")) {
        envelope.classList.add("open");
        setTimeout(() => {
            menuCard.style.display = "flex";
        }, 500);
    }
});

letterBtn.addEventListener("click", () => showPage("letterPage"));
answerBtn.addEventListener("click", () => showPage("answerPage"));

backBtn.addEventListener("click", () => {
    showPage("page3");
    envelope.classList.remove("open");
    menuCard.style.display = "none";
});

// =====================================================
// NAVIGATION BACK BUTTONS
// =====================================================
backToPage3.addEventListener("click", () => {
    showPage("page3");
    // Reset posisi tombol no ke posisi asal
    noBtn.style.position = "absolute";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
    noBtn.style.right = "0";
});

backToAnswer.addEventListener("click", () => {
    showPage("answerPage");
});

// =====================================================
// ANSWER PAGE & RANDOM RUNAWAY NO BUTTON (ACAK SEGALA ARAH)
// =====================================================
yesBtn.addEventListener("click", () => {
    showPage("finalPage");
});

function moveNoButton(e) {
    const rect = noBtn.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (!clientX || !clientY) return;

    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;
    const distance = Math.hypot(clientX - btnX, clientY - btnY);

    // Jika kursor/sentuhan mendekati radius 120px
    if (distance < 120) {
        const parentRect = answerPage.getBoundingClientRect();
        
        const padding = 30;
        // Membuat perhitungan posisi acak penuh di dalam batas layar halaman
        const maxX = parentRect.width - noBtn.offsetWidth - padding;
        const maxY = parentRect.height - noBtn.offsetHeight - padding;

        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding + 60, Math.random() * (maxY - 80));

        noBtn.style.position = "fixed";
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }
}

answerPage.addEventListener("mousemove", moveNoButton);
answerPage.addEventListener("touchstart", moveNoButton);
answerPage.addEventListener("touchmove", moveNoButton);

// =====================================================
// GLOBAL KEYBOARD LISTENER
// =====================================================
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const page2 = document.getElementById("page2");
        if (page2 && page2.classList.contains("active")) {
            checkPassword();
        }
    }
});