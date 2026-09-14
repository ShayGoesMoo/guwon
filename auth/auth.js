document.querySelectorAll(".form-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".form-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById("registerForm").style.display = tab.dataset.tab === "register" ? "flex" : "none";
        document.getElementById("loginForm").style.display = tab.dataset.tab === "login" ? "flex" : "none";
    });
});

async function registerUser(registerForm) {
    const displayName = registerForm.querySelector("#display-name").value;
    const username = registerForm.querySelector("#register-username").value;
    const password = registerForm.querySelector("#register-password").value;
}