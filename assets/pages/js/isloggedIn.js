
let account = localStorage.getItem("loggedInAccount")
if (account){
document.getElementById("loginButton").style.display="none";
document.getElementById("loggedInUser").innerText = account;
}

