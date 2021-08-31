
$("#header").load("_header.html");

function addTrain() {
event.preventDefault();
const trainNo = document.querySelector("#trainNo").value;
const name = document.querySelector("#name").value;
const noPassenger = document.querySelector("#noPassenger").value;
const source = document.querySelector("#source").value;
const destination = document.querySelector("#destination").value;
const price = document.querySelector("#price").value;
const startTime = document.querySelector("#startTime").value;
const endTime = document.querySelector("#endTime").value;
const duration = document.querySelector("#duration").value;
const stations = document.querySelector("#stations").value;

console.log(trainNo + "+" + name + "+" + noPassenger + "+" + source + "+" + destination + "+" + price + "+" + startTime + "+" + endTime + "+" + duration + "+" + stations);

let formValues = {
    "trainNo": trainNo,
    "name": name,
    "noPassenger": noPassenger,
    "source": source,
    "destination": destination,
    "price": price,
    "startTime": startTime,
    "endTime": endTime,
    "duration": duration,
    "stations": stations
};
console.log(formValues);


ValidatorCheck.trainNoValidation(trainNo).then(res => {
    console.table(res.data);
    let data = res.data.docs;
    
    if (data != "") {
        alert("trainNo already exist enter different trainNo")
        
        return;
    }


let userData = localStorage.getItem("Logged_in_users");
let user = JSON.parse(userData);
console.log(user);
if (user == null) {
  console.log("user : ", user);
  alert("please login");
  window.location.href = "login.html";
}
else {
  console.log("user : ", user);
    
  


try{
    Validator.isValidTrainNo(trainNo, "Invalid Train no");
            

    TrainService.addTrains(formValues).then(res=>{
        let train_list = res.data;
        console.log(train_list);
        alert("Train Added successful");
        window.location.href="list_train_adm.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("Failed to add Train");
    });
   
}

catch(err){
    console.error(err.message);
    alert("Error: " + err.message);
}

}

}).catch(err => {
    console.log(err.response.data)
});



}