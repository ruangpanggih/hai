/* ==========================================
   countdown.js
========================================== */

/*
=============================================
FORMAT TANGGAL

Year, Month, Day, Hour, Minute, Second

Contoh:

22 Mei 2026
08:00 WIB

=============================================
*/

const weddingDate = new Date(

2027, 5, 22, 10, 0, 0

).getTime();

/* ==========================================
ELEMENT
========================================== */

const days = document.getElementById("days");

const hours = document.getElementById("hours");

const minutes = document.getElementById("minutes");

const seconds = document.getElementById("seconds");

/* ==========================================
COUNTDOWN
========================================== */

function updateCountdown(){

const now = new Date().getTime();

const distance = weddingDate - now;

/* Jika waktu habis */

if(distance < 0){

days.innerHTML="00";

hours.innerHTML="00";

minutes.innerHTML="00";

seconds.innerHTML="00";

clearInterval(counter);

return;

}

/* Hitung */

const day = Math.floor(

distance / (1000*60*60*24)

);

const hour = Math.floor(

(distance % (1000*60*60*24))

/

(1000*60*60)

);

const minute = Math.floor(

(distance % (1000*60*60))

/

(1000*60)

);

const second = Math.floor(

(distance % (1000*60))

/

1000

);

/* Tampilkan */

days.innerHTML = String(day).padStart(2,"0");

hours.innerHTML = String(hour).padStart(2,"0");

minutes.innerHTML = String(minute).padStart(2,"0");

seconds.innerHTML = String(second).padStart(2,"0");

}

/* ==========================================
START
========================================== */

updateCountdown();

const counter = setInterval(

updateCountdown,

1000

);

/* ==========================================
ANIMATION
========================================== */

setInterval(()=>{

document.querySelectorAll(".count-box")

.forEach(box=>{

box.animate([

{

transform:"scale(1)"

},

{

transform:"scale(1.05)"

},

{

transform:"scale(1)"

}

],{

duration:500

});

});

},1000);