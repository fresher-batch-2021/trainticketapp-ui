
$("#header").load("_header.html");


$(document).ready (function(){

    console.log("Jquery Loaded");

    $("#addTrainForm").submit(addTrain);

});

function addTrain() {
event.preventDefault();
const trainNo = $("#trainNo").val();
const name = $("#name").val();
const noPassenger = $("#noPassenger").val();
const source = $("#source").val();
const destination = $("#destination").val();
const price = $("#price").val();
const startTime = $("#startTime").val();
const endTime = $("#endTime").val();
const duration = $("#duration").val();
const stations = $("#stations").val();

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
        toastr.error(ErrorMessage.TRAIN_NO_ALREADY);
        
        return;
    }


let userData = localStorage.getItem("Logged_in_users");
let user = JSON.parse(userData);
console.log(user);
if (user == null) {
  console.log("user : ", user);
  
  toastr.error(ErrorMessage.LOGIN_MUST);

setTimeout(function () {
    window.location.href = "login.html"
}, 3000);

//   window.location.href = "login.html";
}
else {
  console.log("user : ", user);
    
  


try{
    Validator.isValidTrainNo(trainNo, ErrorMessage.INVALID_TRAIN_NO);
            

    TrainService.addTrains(formValues).then(res1=>{
        let train_list = res1.data;
        console.log(train_list);
        
        toastr.success("Train Added successful");
        
        setTimeout(function () {
            window.location.href = "list_train_adm.html"
        }, 3000);

    }).catch(err=>{
        console.log(err.response.data);
        toastr.error(ErrorMessage.ADD_TRAIN_FAILED);
    });
   
}

catch(err){
    console.error(err.message);
    toastr.error("Error: " + err.message);
    
}

}

}).catch(err => {
    console.log(err.response.data)
});



}

function list_train(){
    window.location.href = "list_train_adm.html"
}