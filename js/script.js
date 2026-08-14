/* ==========================================
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       ELEMENT
    ===================================== */

    const loader =
        document.getElementById("loader");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const openButton =
        document.getElementById("openInvitation");

    const hero =
        document.getElementById("hero");



    /* =====================================
       LOADER
    ===================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {

                loader.style.opacity = "0";
                loader.style.visibility = "hidden";

            }

        }, 1200);

    });



    /* =====================================
       LOADING TEXT
    ===================================== */

    const loadingText =
        document.querySelector("#loader p");

    let dot = 0;

    if (loadingText) {

        setInterval(() => {

            dot = (dot + 1) % 4;

            loadingText.textContent =
                "Loading" + ".".repeat(dot);

        }, 400);

    }



    /* =====================================
       MUSIC
    ===================================== */

    let playing = false;


    function playMusic() {

        if (!music) return;

        const promise = music.play();

        if (promise !== undefined) {

            promise
                .then(() => {

                    playing = true;

                    if (musicButton) {

                        musicButton.innerHTML =
                            '<i class="fa-solid fa-pause"></i>';

                        musicButton.classList.add(
                            "playing"
                        );

                    }

                })
                .catch(() => {

                    console.log(
                        "Music membutuhkan interaksi pengguna."
                    );

                });

        }

    }


    function pauseMusic() {

        if (!music) return;

        music.pause();

        playing = false;

        if (musicButton) {

            musicButton.innerHTML =
                '<i class="fa-solid fa-music"></i>';

            musicButton.classList.remove(
                "playing"
            );

        }

    }


    if (musicButton) {

        musicButton.addEventListener(
            "click",
            () => {

                if (playing) {

                    pauseMusic();

                } else {

                    playMusic();

                }

            }
        );

    }



    /* =====================================
       SMOOTH SCROLL
       CEPAT + HALUS
    ===================================== */

    let smoothAnimation = null;


    function smoothScrollTo(
        target,
        duration = 500
    ) {

        if (!target) return;


        /*
            Batalkan animasi scroll
            sebelumnya
        */

        if (smoothAnimation) {

            cancelAnimationFrame(
                smoothAnimation
            );

        }


        const startPosition =
            window.scrollY;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY;


        const distance =
            targetPosition -
            startPosition;


        let startTime = null;


        function animation(currentTime) {

            if (!startTime) {

                startTime = currentTime;

            }


            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            /*
                Ease Out Cubic

                Awal cepat
                Akhir lebih halus
            */

            const ease =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            window.scrollTo(
                0,
                startPosition +
                distance * ease
            );


            if (progress < 1) {

                smoothAnimation =
                    requestAnimationFrame(
                        animation
                    );

            } else {

                smoothAnimation = null;

            }

        }


        smoothAnimation =
            requestAnimationFrame(
                animation
            );

    }



    /* =====================================
       OPEN INVITATION
    ===================================== */

    if (openButton) {

        openButton.addEventListener(
            "click",
            () => {


                /*
                    Aktifkan scrolling
                */

                document.body.style.overflowY =
                    "auto";


                /*
                    Musik
                */

                playMusic();


                /*
                    Pastikan auto-scroll
                    sebelumnya berhenti
                */

                stopAutoScroll();


                /*
                    Smooth menuju Hero
                */

                smoothScrollTo(
                    hero,
                    500
                );


                /*
                    Setelah smooth selesai,
                    mulai auto-scroll
                */

                setTimeout(() => {

                    startAutoScroll();

                }, 600);

            }
        );

    }



    /* =====================================
       NAVIGATION
       ===================================== */

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                /*
                    Kalau user memilih
                    menu secara manual,
                    hentikan auto-scroll
                */

                stopAutoScroll();


                smoothScrollTo(
                    target,
                    500
                );

            }
        );

    });



    /* =====================================
       FALLING FLOWER
    ===================================== */

    function createPetal() {

        const petal =
            document.createElement("img");


        petal.src =
            "images/floral/petal.png";


        petal.className =
            "petal";


        petal.style.left =
            Math.random() *
            window.innerWidth +
            "px";


        petal.style.width =
            15 +
            Math.random() * 18 +
            "px";


        petal.style.animationDuration =
            6 +
            Math.random() * 8 +
            "s";


        petal.style.opacity =
            0.4 +
            Math.random() * 0.6;


        document.body.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, 15000);

    }


    setInterval(
        createPetal,
        900
    );



    /* =====================================
       REVEAL ANIMATION
    ===================================== */

    const reveal =
        document.querySelectorAll(
            ".fade-up"
        );


    function revealScroll() {

        reveal.forEach(item => {

            const top =
                item.getBoundingClientRect()
                    .top;


            if (
                top <
                window.innerHeight - 80
            ) {

                item.classList.add(
                    "show"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealScroll,
        {
            passive: true
        }
    );


    revealScroll();

});



/* ==========================================
   AUTO SCROLL
   SMOOTH + STABIL
========================================== */

let autoScroll = null;

let isAutoScrolling = false;


/*
    KECEPATAN AUTO SCROLL

    0.5  = sangat pelan
    1.0  = pelan
    1.5  = smooth
    2.0  = sedang
    2.5  = cepat
    3.0  = sangat cepat
*/

const scrollSpeed = 2.5;



/* ==========================================
   START AUTO SCROLL
========================================== */

function startAutoScroll() {

    if (isAutoScrolling) return;


    isAutoScrolling = true;


    let lastTime =
        performance.now();


    function scrollStep(
        currentTime
    ) {

        if (!isAutoScrolling) {

            return;

        }


        const delta =
            currentTime -
            lastTime;


        lastTime =
            currentTime;


        /*
            Delta time membuat
            kecepatan stabil di
            desktop dan mobile
        */

        const movement =
            scrollSpeed *
            (delta / 16.67);


        window.scrollBy(
            0,
            movement
        );


        /*
            Berhenti di bawah
        */

        const atBottom =
            window.innerHeight +
            window.scrollY >=
            document.documentElement
                .scrollHeight - 2;


        if (atBottom) {

            stopAutoScroll();

            return;

        }


        autoScroll =
            requestAnimationFrame(
                scrollStep
            );

    }


    autoScroll =
        requestAnimationFrame(
            scrollStep
        );

}



/* ==========================================
   STOP AUTO SCROLL
========================================== */

function stopAutoScroll() {

    isAutoScrolling = false;


    if (autoScroll) {

        cancelAnimationFrame(
            autoScroll
        );

        autoScroll = null;

    }

}



/* ==========================================
   USER CONTROL
========================================== */

/*
    Kalau user benar-benar melakukan
    scroll / sentuhan / keyboard,
    auto-scroll dihentikan.

    Jangan hapus bagian ini jika
    kamu ingin user tetap bisa
    mengambil alih scrolling.
*/

let userInteracting = false;


function userStopAutoScroll() {

    if (!isAutoScrolling) return;


    userInteracting = true;

    stopAutoScroll();


    setTimeout(() => {

        userInteracting = false;

    }, 300);

}


/*
    Mouse wheel
*/

window.addEventListener(
    "wheel",
    userStopAutoScroll,
    {
        passive: true
    }
);


/*
    Touch
*/

window.addEventListener(
    "touchstart",
    userStopAutoScroll,
    {
        passive: true
    }
);


/*
    Keyboard
*/

window.addEventListener(
    "keydown",
    event => {

        const keys = [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            " ",
            "Home",
            "End"
        ];


        if (
            keys.includes(
                event.key
            )
        ) {

            userStopAutoScroll();

        }

    }
);