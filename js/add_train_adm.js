
$("#header").load("_header.html");

function addTrain() {
event.preventDefault();
const trainNo = document.querySelector("#trainNo").value;
const trainName = document.querySelector("#trainName").value;
const noPassenger = document.querySelector("#noPassenger").value;
const sourceStation = document.querySelector("#sourceStation").value;
const destinationStation = document.querySelector("#destinationStation").value;
const ticketPrice = document.querySelector("#ticketPrice").value;
const arrival = document.querySelector("#arrival").value;
const depart = document.querySelector("#depart").value;

console.log(trainNo + "+" + trainName + "+" + noPassenger + "+" + sourceStation + "+" + destinationStation + "+" + ticketPrice + "+" + arrival + "+" + depart);

let formvalues = {
    "trainNo": trainNo,
    "trainName": trainName,
    "noPassenger": noPassenger,
    "sourceStation": sourceStation,
    "destinationStation": destinationStation,
    "ticketPrice": ticketPrice,
    "arrival": arrival,
    "depart": depart
};
console.log(formvalues);

if(trainNo.length != 5){
    alert("Invalid Train no");
}
else{
alert("Form submission completed");
// window.location.href = "list_train_adm.html";
}


}