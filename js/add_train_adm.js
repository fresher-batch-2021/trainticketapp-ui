
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

    
    
    
    const url="https://product-mock-api.herokuapp.com/trainapp/api/v1/trains";
    axios.post(url,formvalues).then(res=>{
        let train_list = res.data;
        alert("Train Added successful");
        console.log(train_list);
        alert("yes");
        localStorage.setItem("Added_Train",JSON.stringify(res.data));
        alert("added in local storage");
        window.location.href="list_train_adm.html";
    }).catch(err=>{
        alert("Failed to add Train");
    });
   

    // const url="https://product-mock-api.herokuapp.com/trainapp/api/v1/trains";
    // axios.get(url,formvalues).then(res=>{
    //     let train_list = res.data;
    //     alert("Train Added successful");
    //     console.log(train_list);
    //     alert("yes");
    //     localStorage.setItem("Added_Train",JSON.stringify(res.data));
    //     alert("added in local storage");
    //     // window.location.href="list.html";
    // }).catch(err=>{
    //     alert("Register failed");
    // });
   




// alert("Form submission completed");
// // window.location.href = "list_train_adm.html";
}


}