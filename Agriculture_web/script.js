// ========================================
// VERDANT AGRITECH - JAVASCRIPT
// ========================================


// ----------------------------------------
// 1. NAVBAR - SCROLL EFFECT
// ----------------------------------------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ----------------------------------------
// 2. SMOOTH SCROLLING
// ----------------------------------------

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ----------------------------------------
// 3. ANIMATED STATISTICS
// ----------------------------------------

const counters = document.querySelectorAll(".stat-number");

const animateCounter = (counter) => {

    const targetText = counter.textContent;

    const number = parseFloat(targetText.replace(/[^0-9.]/g, ""));

    const suffix = targetText.replace(/[0-9.]/g, "");

    let current = 0;

    const increment = number / 80;

    const updateCounter = () => {

        current += increment;

        if (current < number) {

            if (Number.isInteger(number)) {
                counter.textContent =
                    Math.floor(current).toLocaleString() + suffix;
            } else {
                counter.textContent =
                    current.toFixed(1) + suffix;
            }

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent =
                Number.isInteger(number)
                    ? number.toLocaleString() + suffix
                    : number.toFixed(1) + suffix;
        }
    };

    updateCounter();
};


// Start counter animation only when stats become visible

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);
            }
        });

    },
    {
        threshold: 0.5
    }
);

counters.forEach(counter => {
    counterObserver.observe(counter);
});


// ----------------------------------------
// 4. SCROLL REVEAL ANIMATION
// ----------------------------------------

const revealElements = document.querySelectorAll(
    ".solution-card, .impact-card, .technology-content, .quote-card"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});


// ----------------------------------------
// 5. CTA BUTTON
// ----------------------------------------

const ctaButtons = document.querySelectorAll(
    ".btn-primary, .nav-cta"
);

ctaButtons.forEach(button => {

    button.addEventListener("click", () => {

        const contactSection =
            document.querySelector("#contact");

        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }
    });

});


// ----------------------------------------
// 6. WEATHER CARD - DYNAMIC TIME
// ----------------------------------------

const weatherTime = document.querySelector(".weather-time");

if (weatherTime) {

    const updateTime = () => {

        const now = new Date();

        const hours = now.getHours();

        const minutes = String(now.getMinutes()).padStart(2, "0");

        const period = hours >= 12 ? "PM" : "AM";

        const displayHour =
            hours % 12 || 12;

        weatherTime.textContent =
            `${displayHour}:${minutes} ${period}`;
    };

    updateTime();

    setInterval(updateTime, 60000);
}


// ----------------------------------------
// 7. MOBILE MENU
// ----------------------------------------

const navLinks = document.querySelector(".nav-links");

const menuButton = document.querySelector(".menu-button");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuButton.classList.toggle("active");

    });


    // Close menu after clicking a link

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuButton.classList.remove("active");

        });

    });
}


// ----------------------------------------
// 8. SOLUTION CARD HOVER EFFECT
// ----------------------------------------

const cards = document.querySelectorAll(".solution-card");

cards.forEach(card => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;

        const centerY = rect.height / 2;

        const rotateX =
            (y - centerY) / 30;

        const rotateY =
            (centerX - x) / 30;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });

});


// ----------------------------------------
// 9. ACTIVE NAVIGATION LINK
// ----------------------------------------

const sections = document.querySelectorAll("section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");
        }
    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");
        }

    });

});


// ----------------------------------------
// 10. CONTACT / GET STARTED MESSAGE
// ----------------------------------------

const startButtons =
    document.querySelectorAll(".btn-primary");

startButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log(
            "Welcome to Verdant 🌱"
        );

    });

});


// ----------------------------------------
// 11. PAGE LOAD ANIMATION
// ----------------------------------------

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


// ----------------------------------------
// 12. CURRENT YEAR IN FOOTER
// ----------------------------------------

const yearElement =
    document.querySelector("#current-year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();
}

console.log(
    "🌱 Verdant Agritech website loaded successfully."
);