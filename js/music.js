/* ==========================================
   music.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("music");
    const button = document.getElementById("musicButton");

    if (!audio || !button) return;

    /* ======================================
       DEFAULT
    ====================================== */

    audio.volume = 0.5;
    audio.loop = true;

    let isPlaying = false;

    /* ======================================
       ICON
    ====================================== */

    function updateButton() {

        if (isPlaying) {

            button.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            button.classList.add("playing");

        } else {

            button.innerHTML =
                '<i class="fa-solid fa-music"></i>';

            button.classList.remove("playing");

        }

    }

    /* ======================================
       FADE IN
    ====================================== */

    function fadeIn() {

        audio.volume = 0;

        audio.play().catch(() => {});

        let volume = 0;

        const interval = setInterval(() => {

            volume += 0.05;

            if (volume >= 0.5) {

                volume = 0.5;

                clearInterval(interval);

            }

            audio.volume = volume;

        }, 120);

    }

    /* ======================================
       FADE OUT
    ====================================== */

    function fadeOut() {

        let volume = audio.volume;

        const interval = setInterval(() => {

            volume -= 0.05;

            if (volume <= 0) {

                volume = 0;

                audio.pause();

                clearInterval(interval);

            }

            audio.volume = volume;

        }, 120);

    }

    /* ======================================
       PLAY
    ====================================== */

    function playMusic() {

        fadeIn();

        isPlaying = true;

        updateButton();

        localStorage.setItem("music", "play");

    }

    /* ======================================
       PAUSE
    ====================================== */

    function pauseMusic() {

        fadeOut();

        isPlaying = false;

        updateButton();

        localStorage.setItem("music", "pause");

    }

    /* ======================================
       BUTTON
    ====================================== */

    button.addEventListener("click", () => {

        if (isPlaying) {

            pauseMusic();

        } else {

            playMusic();

        }

    });

    /* ======================================
       OPEN INVITATION
    ====================================== */

    const openBtn =
        document.getElementById("openInvitation");

    if (openBtn) {

        openBtn.addEventListener("click", () => {

            if (!isPlaying) {

                playMusic();

            }

        });

    }

    /* ======================================
       RESTORE STATE
    ====================================== */

    if (localStorage.getItem("music") === "play") {

        playMusic();

    }

    /* ======================================
       ICON ROTATE
    ====================================== */

    setInterval(() => {

        if (isPlaying) {

            button.style.transform = "rotate(360deg)";

            setTimeout(() => {

                button.style.transform = "rotate(0deg)";

            }, 900);

        }

    }, 1000);

    /* ======================================
       TAB CHANGE
    ====================================== */

    document.addEventListener("visibilitychange", () => {

        if (document.hidden && isPlaying) {

            audio.volume = 0.25;

        } else if (isPlaying) {

            audio.volume = 0.5;

        }

    });

});