// this function is used to update the logout link/button based on the user's authentication state
// it checks if the user is logged in or not and updates the text based on the value
async function updateLogoutBtn() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const authLink = document.getElementById("auth-link");
    const authLinkText = document.getElementById("auth-link-text");

    if (session) {
        authLinkText.textContent = "Log Out";
        authLink.href = "#";
        authLink.onclick = (e) => {
            e.preventDefault();
            authLinkText.textContent = "Logging out...";
            userLogout();
        };
    } else {
        authLinkText.textContent = "Log In";
        authLink.href = "/auth/";
        authLink.onclick = null;
    }
}

// this is the function that handles the logging out process
// it calles the supabaseClient.auth.signOut() method to log out the user and redirects them to the login/register page
async function userLogout() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        console.log("Logout failed: " + error.message);
        return;
    }

    window.location.href = "/auth/";
}

// this is the event listener that listens for changes in the user's authentication state
supabaseClient.auth.onAuthStateChange((event, session) => {
    updateLogoutBtn();
});