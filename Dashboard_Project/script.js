/* =========================================================
   STUDENTOS DASHBOARD
   VANILLA JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const searchInput = document.getElementById("searchInput");

const themeBtn = document.getElementById("themeBtn");

const notificationBtn =
    document.getElementById("notificationBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const profileMenu =
    document.getElementById("profileMenu");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");

const currentDate =
    document.getElementById("currentDate");

const currentTime =
    document.getElementById("currentTime");


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        openSidebar
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


/* Close sidebar when clicking navigation */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 800) {

            closeSidebar();

        }

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


/* =========================================================
   CURRENT DATE & TIME
========================================================= */

function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit"
    };

    currentDate.textContent =
        now.toLocaleDateString(
            "en-US",
            dateOptions
        );

    currentTime.textContent =
        now.toLocaleTimeString(
            "en-US",
            timeOptions
        );
}


updateDateTime();

setInterval(
    updateDateTime,
    1000
);


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(
    title,
    message
) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


function hideToast() {

    toast.classList.remove("show");

    clearTimeout(toastTimeout);
}


toastClose.addEventListener(
    "click",
    hideToast
);


/* =========================================================
   THEME SWITCHER
========================================================= */

const savedTheme =
    localStorage.getItem("studentos-theme");

if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-theme"
        );

        const isLight =
            document.body.classList.contains(
                "light-theme"
            );

        localStorage.setItem(
            "studentos-theme",
            isLight
                ? "light"
                : "dark"
        );

        showToast(
            "Theme updated",
            isLight
                ? "Light mode enabled."
                : "Dark mode enabled."
        );

    }
);


/* =========================================================
   NOTIFICATIONS
========================================================= */

notificationBtn.addEventListener(
    "click",
    () => {

        showToast(
            "Notifications",
            "You have 3 unread notifications."
        );

    }
);


/* =========================================================
   PROFILE
========================================================= */

profileMenu.addEventListener(
    "click",
    () => {

        showToast(
            "Student Profile",
            "Profile menu opened."
        );

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutBtn.addEventListener(
    "click",
    () => {

        const confirmLogout =
            window.confirm(
                "Are you sure you want to sign out?"
            );

        if (confirmLogout) {

            showToast(
                "Signed out",
                "You have been signed out successfully."
            );

        }

    }
);


/* =========================================================
   SEARCH
========================================================= */

const searchableItems = [
    ...document.querySelectorAll(
        ".course-card, .assignment, .schedule-item, .notification-item"
    )
];


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        searchableItems.forEach(item => {

            const text =
                item.textContent.toLowerCase();

            if (
                query === "" ||
                text.includes(query)
            ) {

                item.style.display = "";

            } else {

                item.style.display = "none";

            }

        });

    }
);


/* =========================================================
   COMMAND + K SEARCH SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.metaKey || event.ctrlKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =========================================================
   PERFORMANCE SELECT
========================================================= */

const performanceSelect =
    document.getElementById(
        "performanceSelect"
    );


performanceSelect.addEventListener(
    "change",
    () => {

        showToast(
            "Performance updated",
            `Showing data for ${performanceSelect.value.toLowerCase()}.`
        );

    }
);


/* =========================================================
   COURSE BUTTONS
========================================================= */

document.querySelectorAll(
    ".course-footer button"
).forEach(button => {

    button.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const courseCard =
                button.closest(".course-card");

            const courseName =
                courseCard.querySelector("h3")
                    .textContent;

            showToast(
                "Opening course",
                courseName
            );

        }
    );

});


/* =========================================================
   COURSE CARD CLICK
========================================================= */

document.querySelectorAll(
    ".course-card"
).forEach(card => {

    card.addEventListener(
        "click",
        event => {

            if (
                event.target.tagName === "BUTTON"
            ) {
                return;
            }

            const courseName =
                card.querySelector("h3")
                    .textContent;

            showToast(
                "Course selected",
                courseName
            );

        }
    );

});


/* =========================================================
   VIEW ALL BUTTONS
========================================================= */

document.querySelectorAll(
    ".text-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showToast(
                "View all",
                "Additional content would open here."
            );

        }
    );

});


/* =========================================================
   OUTLINE BUTTON
========================================================= */

document.querySelector(
    ".outline-btn"
).addEventListener(
    "click",
    () => {

        showToast(
            "My Courses",
            "Course library opened."
        );

    }
);


/* =========================================================
   COURSE MENU BUTTONS
========================================================= */

document.querySelectorAll(
    ".course-menu"
).forEach(menu => {

    menu.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            showToast(
                "Course options",
                "More course actions are available here."
            );

        }
    );

});


/* =========================================================
   SCHEDULE ITEMS
========================================================= */

document.querySelectorAll(
    ".schedule-item"
).forEach(item => {

    item.style.cursor = "pointer";

    item.addEventListener(
        "click",
        () => {

            const title =
                item.querySelector(
                    ".schedule-info strong"
                ).textContent;

            showToast(
                "Schedule",
                `${title} selected.`
            );

        }
    );

});


/* =========================================================
   ASSIGNMENTS
========================================================= */

document.querySelectorAll(
    ".assignment"
).forEach(item => {

    item.style.cursor = "pointer";

    item.addEventListener(
        "click",
        () => {

            const title =
                item.querySelector(
                    ".assignment-info strong"
                ).textContent;

            showToast(
                "Assignment",
                `${title} selected.`
            );

        }
    );

});


/* =========================================================
   RESIZE HANDLER
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 800) {

            closeSidebar();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSidebar();

            hideToast();

        }

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "%c StudentOS Dashboard ",
    "background:#76ff03;color:#071006;font-weight:bold;padding:5px 10px;"
);

console.log(
    "Dashboard initialized successfully."
);