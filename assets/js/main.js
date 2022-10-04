document.addEventListener("DOMContentLoaded", loadAfterDom);

function loadAfterDom() {
    const form = document.getElementById("form")
    form.addEventListener("submit", async (event) => {
        const mailSuccess = document.getElementById("mailSuccess")
        event.preventDefault();
        const response = await fetch("actions/action.php", {
            method: "POST",
            body: new FormData(form)
        })
        if (response.ok) {
            mailSuccess.classList.add("bg-success");
            mailSuccess.innerText = "";
            mailSuccess.innerText = "Email byl úspěšně odeslán!";
        } else {
            mailSuccess.classList.add("bg-danger");
            mailSuccess.innerText = "";
            mailSuccess.innerText = "Při odesílání e-mailu nastala chyba!";
        }
    });
}

(function () {
    "use strict";

    // ======= Sticky
    window.onscroll = function () {
        const ud_header = document.querySelector(".ud-header");
        const sticky = ud_header.offsetTop;
        const logo = document.querySelector(".navbar-brand img");
        const logoText = document.querySelector(".navbar-brand");
        const burger = document.querySelector(".navbar-toggler i");

        if (window.scrollY > sticky) {
            ud_header.classList.add("sticky");
        } else {
            ud_header.classList.remove("sticky");
        }

        // === logo change
        if (ud_header.classList.contains("sticky")) {
            logo.src = "assets/images/logo/logo-2.png";
            logoText.style.color = "#3056d3";
            burger.className = "fa-solid fa-bars text-primary";
        } else {
            logo.src = "assets/images/logo/logo.png";
            logoText.style.color = "#fff";
            burger.className= "fa-solid fa-bars text-white";
        }

        // show or hide the back-top-top button
        const backToTop = document.querySelector(".back-to-top");
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    };

    //===== close navbar-collapse when a  clicked
    let navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove("show");
        })
    );
    navbarToggler.addEventListener("click", function () {
        navbarToggler.classList.toggle("active");
        navbarCollapse.classList.toggle("show");
    });

    // ===== submenu
    const submenuButton = document.querySelectorAll(".nav-item-has-children");
    submenuButton.forEach((elem) => {
        elem.querySelector("a").addEventListener("click", () => {
            elem.querySelector(".ud-submenu").classList.toggle("show");
        });
    });

    // ====== scroll top js
    function scrollTo(element, to = 0, duration = 500) {
        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
            currentTime += increment;

            element.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };

        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    document.querySelector(".back-to-top").onclick = () => {
        scrollTo(document.documentElement);
    };
})();
