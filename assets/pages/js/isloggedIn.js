
let account = localStorage.getItem("loggedInAccount")
if (account){
document.getElementById("loginButton").style.display="none";
document.getElementById("loggedInUser").innerText = account;

}

// const logeout=document.querySelector(".logeout-btn")
// logeout.addEventListener("click",(e)=>{

// })

// let username=localStorage.getItem("loggedInAccount")


// if(username){
//    document.getElementById("logeout-btn").style.display="show"
//    document.getElementById("logeout-btn").innerHTML=username
// }