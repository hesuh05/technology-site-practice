function changePath(url){
    window.location.href=url
}
function goToAdvancedSearch() {
    window.location.href = "http://127.0.0.1:5500/advanced_filters.html";
}

(function initializeThemeEarly() {
    const storedTheme = localStorage.getItem("devsignature-theme");
    const initialTheme = storedTheme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", initialTheme);
})();

function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme) {
    const defaultTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", defaultTheme);
    localStorage.setItem("devsignature-theme", defaultTheme);

    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const isLight = defaultTheme === "light";
    toggle.textContent = isLight ? "☀️ Luz" : "🌙 Noche";
    toggle.setAttribute("aria-label", isLight ? "Cambiar a modo oscuro" : "Cambiar a modo brillante");
}

function addThemeToggle() {
    if (document.getElementById("theme-toggle")) return;

    const toggleButton = document.createElement("button");
    toggleButton.id = "theme-toggle";
    toggleButton.className = "theme-toggle";
    toggleButton.type = "button";

    toggleButton.addEventListener("click", () => {
        const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        animateThemeTransition();
        applyTheme(nextTheme);
    });

    const dropdownMenu = document.querySelector(".navbar-dropdown-menu");

    if (dropdownMenu) {
        toggleButton.classList.add("navbar-button", "theme-toggle-menu");
        dropdownMenu.appendChild(toggleButton);
    } else {
        toggleButton.classList.add("theme-toggle-floating");
        document.body.appendChild(toggleButton);
    }

    applyTheme(getCurrentTheme());
}

document.addEventListener("DOMContentLoaded", () => {
    addThemeToggle();
});

function animateThemeTransition() {
    document.documentElement.classList.add("theme-animating");
    window.setTimeout(() => {
        document.documentElement.classList.remove("theme-animating");
    }, 260);
}
