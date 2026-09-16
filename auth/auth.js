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

// login form submission logic
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("loginForm");
    loginUser(loginForm);
});

async function resolveIdentifer(identifier) {
    if (identifier.includes("@")) {
        return identifier;
    }

    const { data, error } = await supabaseClient.rpc("get_email_for_login", { identifier });

    if (error || !data) {
        return null;
    }

    return data;
}

async function loginUser(loginForm) {
    const identifier = loginForm.querySelector("#login-identifier").value.trim();
    const password = loginForm.querySelector("#login-password").value;
    const email = await resolveIdentifer(identifier);

    if (!email) {
        console.log("No account found.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.log("Login failed: " + error.message);
        return;
    }

    window.location.href = "../home";
}