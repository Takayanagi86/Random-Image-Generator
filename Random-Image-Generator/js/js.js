//////////////////////////////////////////
//List of variables
//////////////////////////////////////////

const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const picArea = document.querySelector('.image-box');
const savePicArea = document.querySelector('.save-img-box');
const pic = "https://source.unsplash.com/400x400/?gecko";
const emailInput = document.querySelector('.email-input');
let email = emailInput.value;
let users = [];
let storedNames = JSON.parse(localStorage.getItem("users"));
let User = false;
let saveResponse = "";
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
let index = 0;
const linkBox = document.querySelector('.all-img');

//////////////////////////////////////////
//View picture button
//////////////////////////////////////////

btn1.onclick = function() {
    email = emailInput.value;
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    storedNames = JSON.parse(localStorage.getItem("users"));
    User = false;
  if (email.match(mailformat)) {
    if (storedNames != null) {
      for (let i = 0; i < storedNames.length; i++) {
        if (storedNames[i] == email) {
            User = true;
            break;
          } 
        }
        if (User == false) {
          users.push(email);
          localStorage.setItem("users", JSON.stringify(users));
        }else
        {
          fetch(`https://source.unsplash.com/800x800/?gecko`)
          .then((response) => {
            saveResponse = response.url;
            picArea.innerHTML = `<img  src="${response.url}" alt="image"/>`
          });
        }
      } else {
        users.push(email);
          localStorage.setItem("users", JSON.stringify(users));
      }
    }  else
  {
    alert("You have not entered a valid email adress.");
  }
}

//////////////////////////////////////////
//Save picture button
//////////////////////////////////////////

btn2.onclick = function() {
  if (index == 0) {
    box1.innerHTML = `<img  src="${saveResponse}" alt="image" width="400px" height="400px"/>`
    index = 1;
  } else if(index == 1){
    box2.innerHTML = `<img  src="${saveResponse}" alt="image" width="400px" height="400px"/>`
    index = 2;
  }else if (index == 2)  {
    box3.innerHTML = `<img  src="${saveResponse}" alt="image" width="400px" height="400px"/>`
    index = 0;
  }
  let newLink = document.createElement('a');
  newLink.innerHTML = "<p>" + "email: " + email + " Link: " + saveResponse + "</p>" + "<p></p>";
  linkBox.appendChild(newLink);
  newLink.target = "_blank";
  newLink.href = saveResponse;

}