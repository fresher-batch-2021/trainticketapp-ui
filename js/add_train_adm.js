
$("#header").load("_header.html");

function addTrain() {
event.preventDefault();
const trainNo = document.querySelector("#trainNo").value;
const trainName = document.querySelector("#trainName").value;
const noPassenger = document.querySelector("#noPassenger").value;

console.log(trainNo + "+" + trainName + "+" + noPassenger);

let formvalues = {
    "trainNo": trainNo,
    "trainName": trainName,
    "noPassenger": noPassenger
};
console.log(formvalues);

if(trainNo.length != 5){
    alert("Invalid Train no");
}
else{
alert("Form submission completed");
window.location.href = "list_train_adm.html";
}


}