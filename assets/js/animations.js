
document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    const createAnimation = (selector, options) => {
        gsap.from(selector, {
            scrollTrigger: {
                trigger: selector,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            ...options
        });
    };

    // --- Animations for different sections ---

    // About Section
    createAnimation("#about .title-conference", { opacity: 0, y: -50, duration: 1 });
    createAnimation("#about h4", { opacity: 0, y: 50, duration: 1, delay: 0.3 });

    // Timeline Section
    createAnimation("#schedule .title-conference", { opacity: 0, y: -50, duration: 1 });
    createAnimation("#schedule .Sec-title", { opacity: 0, scale: 0.8, duration: 1, delay: 0.3 });
    gsap.from(".speakers-timeline-item", {
        scrollTrigger: {
            trigger: ".speakers-timeline-cover",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2
    });

    // Sponsor Section
    createAnimation("#sponsor .title-conference", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".client-slide", {
        scrollTrigger: {
            trigger: ".clients-cover",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.2
    });

    // Gallery Section
    createAnimation("#galeri", { opacity: 0, duration: 1});
    createAnimation("#galeri .title-conference", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".instagram-item", {
        scrollTrigger: {
            trigger: ".instagram-cover",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15
    });

    // --- PPT Slider Animations ---
    const slides = document.querySelectorAll('.ppt-slide');
    slides.forEach((slide) => {
        const contentSections = slide.querySelectorAll('.content-section');

        if (contentSections.length > 0) {
            // Animasi akan dipicu oleh content-manager.js saat slide diaktifkan
        }
    });
});
