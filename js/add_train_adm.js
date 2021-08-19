
$("#header").load("headerAdminLogged.html");

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

let formvalues = {
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
console.log(formvalues);

if(trainNo.length != 5){
    alert("Invalid Train no");
}
else{

    
    const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
    const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

    
    
    const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains";
    axios.post(url,formvalues,{ headers: { 'Authorization': basicAuth } }).then(res=>{
        let train_list = res.data;
        alert("Train Added successful");
        window.location.href="list_train_adm.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("Failed to add Train");
    });
   
}


}