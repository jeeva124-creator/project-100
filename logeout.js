
// const testurl=
// const url= new URL (testurl);
// const params=Object.fromEntries(url.searchParams.entries)
// console.log(params);

// Retrieve and display the username
let userName = localStorage.getItem("username");
const profile = document.getElementById("profile");
profile.addEventListener("click", (e) => {
    e.stopPropagation();
    let profileContainer = document.getElementById("profileContainer");
    if (!profileContainer) {
        profileContainer = document.createElement("div");
        profileContainer.setAttribute("id", "profileContainer");
        profileContainer.classList.add("profileManage");
        profileContainer.innerHTML = userName
            ? `<p>Hello, ${userName}!</p>`
            : "<p>No username found. Please login.</p>";
        const logoutIcon = document.createElement("i");
        logoutIcon.classList.add("logoutIcon", "fa", "fa-sign-out");
        logoutIcon.style.cursor = "pointer";
        const logoutText = document.createElement("span");
        logoutText.setAttribute("id", "logoutText");
        logoutText.textContent = "Logout";
        logoutText.style.marginLeft = "8px";
        logoutText.style.cursor = "pointer";
        const handleLogout = () => {
            localStorage.removeItem("username");
            localStorage.removeItem("loggedIn");
            window.location.href = "/index.html";
            window.history.pushState(null, null, window.location.href);
            window.addEventListener("popstate", function () {
                window.history.pushState(null, null, window.location.href);
            });
        };
        logoutIcon.addEventListener("click", handleLogout);
        logoutText.addEventListener("click", handleLogout);
        profileContainer.appendChild(logoutIcon);
        profileContainer.appendChild(logoutText);
        document.body.appendChild(profileContainer);
    } else {
        profileContainer.classList.toggle("h");
    }
});
// Hide profile container when clicking outside of it
document.addEventListener("click", (e) => {
    const profileContainer = document.getElementById("profileContainer");
    if (profileContainer && !profileContainer.contains(e.target) && e.target !== profile) {
        profileContainer.classList.add("h");
    }
    
});