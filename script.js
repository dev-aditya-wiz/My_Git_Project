// Like buttons
const likeButtons = document.querySelectorAll(".likeBtn");

likeButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (button.textContent === "♡") {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});


// Follow button
const followBtn = document.getElementById("followBtn");

followBtn.addEventListener("click", () => {

    if (followBtn.textContent === "Follow") {
        followBtn.textContent = "Following";
        followBtn.style.background = "#555";
    } else {
        followBtn.textContent = "Follow";
        followBtn.style.background = "#0095f6";
    }

});


// Dark mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }

});