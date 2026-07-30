// =====================================================
// ELEMENT
// =====================================================

const pages = document.querySelectorAll(".page");

const startBtn = document.getElementById("startBtn");
const stayBtn = document.getElementById("stayBtn");

const pin1 = document.getElementById("pin1");
const pin2 = document.getElementById("pin2");

const enterBtn = document.getElementById("enterBtn");

const wrongText = document.getElementById("wrongText");


// =====================================================
// SHOW PAGE
// =====================================================

function showPage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
        .getElementById(id)
        .classList.add("active");

}


// =====================================================
// PAGE 1
// =====================================================

startBtn.addEventListener("click",()=>{

    showPage("page2");

});


stayBtn.addEventListener("click",()=>{

    // Tetap di halaman pertama
    return;

});


// =====================================================
// PASSWORD INPUT
// =====================================================

// Hanya boleh angka
pin1.addEventListener("input",()=>{

    pin1.value = pin1.value.replace(/\D/g,"");

    if(pin1.value.length===1){

        pin2.focus();

    }

});


pin2.addEventListener("input",()=>{

    pin2.value = pin2.value.replace(/\D/g,"");

});


// =====================================================
// ENTER DENGAN KEYBOARD
// =====================================================

pin2.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        checkPassword();

    }

});


// =====================================================
// BUTTON ENTER
// =====================================================

enterBtn.addEventListener("click",()=>{

    checkPassword();

});


// =====================================================
// CHECK PASSWORD
// =====================================================

function checkPassword(){

    const password = pin1.value + pin2.value;

    if(password==="22"){

        wrongText.style.display="none";

        showPage("page3");

        pin1.value="";
        pin2.value="";

    }

    else{

        wrongText.style.display="block";

        pin1.value="";
        pin2.value="";

        pin1.focus();

    }

}

// =====================================================
// PAGE 3
// ENVELOPE & MENU
// =====================================================

const envelope = document.getElementById("envelope");
const menuCard = document.querySelector(".menu-card");

const letterBtn = document.getElementById("letterBtn");
const answerBtn = document.getElementById("answerBtn");

const backBtn = document.querySelector(".backBtn");


// =====================================================
// OPEN ENVELOPE
// =====================================================

envelope.addEventListener("click",()=>{

    envelope.classList.add("open");

    // Muncul menu setelah amplop terbuka
    setTimeout(()=>{

        menuCard.style.display="flex";

    },500);

});


// =====================================================
// LETTER PAGE
// =====================================================

letterBtn.addEventListener("click",()=>{

    showPage("letterPage");

});


// =====================================================
// BACK
// =====================================================

backBtn.addEventListener("click",()=>{

    showPage("page3");

});


// =====================================================
// ANSWER PAGE
// =====================================================

answerBtn.addEventListener("click",()=>{

    showPage("answerPage");

});

// =====================================================
// ANSWER PAGE
// =====================================================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const answerPage = document.getElementById("answerPage");


// =====================================================
// YES
// =====================================================

yesBtn.addEventListener("click",()=>{

    showPage("finalPage");

});


// =====================================================
// NO BUTTON AVOID
// =====================================================

answerPage.addEventListener("mousemove",(e)=>{

    const rect = noBtn.getBoundingClientRect();

    const btnX = rect.left + rect.width/2;
    const btnY = rect.top + rect.height/2;

    const distance = Math.hypot(

        e.clientX - btnX,
        e.clientY - btnY

    );

    // Jika cursor dekat tombol No
    if(distance < 120){

        const area = answerPage.getBoundingClientRect();

        const maxX = area.width - noBtn.offsetWidth - 20;
        const maxY = area.height - noBtn.offsetHeight - 20;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
        noBtn.style.right = "auto";

    }

});


// =====================================================
// RESET ENVELOPE
// =====================================================

document.querySelectorAll(".backBtn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        envelope.classList.remove("open");

        menuCard.style.display = "none";

    });

});


// =====================================================
// ENTER DARI KEYBOARD
// =====================================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        if(document.getElementById("page2").classList.contains("active")){

            checkPassword();

        }

    }

});

// =====================================================
// OPTIONAL
// Mencegah paste di input PIN
// =====================================================

[pin1,pin2].forEach(input=>{

    input.addEventListener("paste",(e)=>{

        e.preventDefault();

    });

});


// =====================================================
// OPTIONAL
// Fokus otomatis ke PIN pertama saat page password dibuka
// =====================================================

startBtn.addEventListener("click",()=>{

    setTimeout(()=>{

        pin1.focus();

    },400);

});