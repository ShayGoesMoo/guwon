// tab switching logic
document.querySelectorAll(".form-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".form-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById("registerForm").style.display = tab.dataset.tab === "register" ? "flex" : "none";
        document.getElementById("loginForm").style.display = tab.dataset.tab === "login" ? "flex" : "none";
    });
});

// register form submission logic
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const registerForm = document.getElementById("registerForm");
    registerUser(registerForm);
});

async function registerUser(registerForm) {
    const displayName = registerForm.querySelector("#display-name").value;
    const username = registerForm.querySelector("#register-username").value.trim();
    const email = registerForm.querySelector("#register-email").value.trim();
    const password = registerForm.querySelector("#register-password").value;

    const { data, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (signUpError) {
        console.log("Signup failed: " + signUpError.message);
        return;
    }

    const { error: insertError } = await supabaseClient.from("users").insert([
        {
            id: data.user.id,
            display_name: displayName,
            email_address: email,
            username: username
        }
    ]);

    if (insertError) {
        console.log("Insert error: " + insertError.message);
        return;
    }

    window.location.href = "../home";
}