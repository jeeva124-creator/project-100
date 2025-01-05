import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFcYTP81HkpKz468_YVdZjbdpn7BSEzIc",
  authDomain: "movie-ticket-booking-a713e.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-a713e-default-rtdb.firebaseio.com",

  projectId: "movie-ticket-booking-a713e",
  storageBucket: "movie-ticket-booking-a713e.firebasestorage.app",
  messagingSenderId: "791048807463",
  appId: "1:791048807463:web:bbb600b5a3a3b2e26eda02",
  measurementId: "G-ZK48NYGYDP",
};
let queryString=window.location.search
const urlParams = new URLSearchParams(queryString);
const selectedtheater= urlParams.get("theatername");
console.log(selectedtheater);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let seatContainer = document.querySelector(".layout")

getLayout();

async function getLayout(){
    try{
       
    const getref=ref(db,`theatres/${selectedtheater}/seats`);
    const response = await get(getref);
    if(response.exists()){
        const data = await response.val();
    console.log(getref);
    
    renderLayout(data);
    }
    else{
        console.log("error")
    }
    
    }
    catch(err){
        console.log(err);
        
    }

}

function renderLayout(dataObj){
    console.log(dataObj);
    
    dataObj.forEach((e)=>{
        let container = document.createElement("div");
        container.classList.add("row");
        let innerArr = e.split(" ");
        innerArr.forEach((e)=>{
            if((e === "_" || e === "x" || e==="")){
                let newBox = document.createElement("p");
                newBox.textContent = e;
                newBox.classList.add("hide");
                container.appendChild(newBox);
            }
            else{
                let newBox = document.createElement("p");
            newBox.textContent = e;
            newBox.classList.add("column");
            container.appendChild(newBox)
            }
            
        })
        seatContainer.appendChild(container)
    })
}

if (column=="_" || column=="x"){
    newBox.classList.add("removie");
}

