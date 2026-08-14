/* ==========================================
   gallery.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       GLIGHTBOX
    ====================================== */

    const lightbox = GLightbox({

        selector: ".glightbox",

        touchNavigation: true,

        loop: true,

        zoomable: true,

        autoplayVideos: true,

        openEffect: "zoom",

        closeEffect: "fade"

    });

    /* ======================================
       GALLERY HOVER EFFECT
    ====================================== */

    const images =
        document.querySelectorAll(".gallery-grid img");

    images.forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.08)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

    });

    /* ======================================
       LAZY LOADING
    ====================================== */

    const lazyImages =
        document.querySelectorAll(".gallery-grid img");

    const observer =
        new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const image = entry.target;

                    image.classList.add("loaded");

                    obs.unobserve(image);

                }

            });

        }, {

            threshold: 0.15

        });

    lazyImages.forEach(img => {

        observer.observe(img);

    });

    /* ======================================
       GALLERY ANIMATION
    ====================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-grid a");

    galleryItems.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.transform = "translateY(40px)";

        setTimeout(() => {

            item.style.transition = ".7s";

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }, index * 120);

    });

    /* ======================================
       PRELOAD IMAGE
    ====================================== */

    images.forEach(img => {

        const preload = new Image();

        preload.src = img.src;

    });

    /* ======================================
       KEYBOARD SHORTCUT
    ====================================== */

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            lightbox.close();

        }

    });

});