const updateButton = document.querySelectorAll(".update-btn");
const updateForm = document.querySelector("#update-form");
let displaying = false;

updateForm.style.display = "none";


for (let i = 0; i < updateButton.length; i++) {
    updateButton[i].addEventListener("click", (e)=>{
        console.log(e);
    });
}

function displayUpdateField () {
    if (displaying) {
        displaying = false;
        updateForm.style.display = "none";
    }
    else {
        displaying = true;
        updateForm.style.display = "";
    }
}

//  /meeps/{{meep.id}}/update