$("#header").load("_header.html");

let params = new URLSearchParams(window.location.search.substr(1));

let _id = params.get("id");
TrainService.getTrain(_id).then(res=>{
    let train = res.data;
    console.log(train);




document.querySelector("#trainNo").value=train.trainNo;

document.querySelector("#name").value=train.name;


document.querySelector("#source").value=train.source;

document.querySelector("#destination").value=train.destination;

document.querySelector("#price").value=train.price;

document.querySelector("#startTime").value=train.startTime;

document.querySelector("#endTime").value=train.endTime;

document.querySelector("#noPassenger").value=train.noPassenger;

document.querySelector("#duration").value=train.duration;

document.querySelector("#stations").value=train.stations;

document.querySelector("#_id").value=train._id;
document.querySelector("#_rev").value=train._rev;

});


function editTrain() {
    event.preventDefault();
    const trainNo = document.querySelector("#trainNo").value;
    const name = document.querySelector("#name").value;
    const id = document.querySelector("#_id").value;
    const rev = document.querySelector("#_rev").value;
    const noPassenger = document.querySelector("#noPassenger").value;
    const source = document.querySelector("#source").value;
    const destination = document.querySelector("#destination").value;
    const stations = document.querySelector("#stations").value;
    const price = document.querySelector("#price").value;
    const startTime = document.querySelector("#startTime").value;
    const endTime = document.querySelector("#endTime").value;
    const duration = document.querySelector("#duration").value;


    let formValues = {
        "_id": id,
        "_rev": rev,
        "trainNo": trainNo,
        "name": name,
        "noPassenger": noPassenger,
        "source": source,
        "destination": destination,
        "stations": stations,
        "price": price,
        "startTime": startTime,
        "endTime": endTime,
        "duration": duration
    };

    console.log(formValues);

    if(trainNo.length != 5){
        alert("Invalid Train no");
    }
    else{
    
   
        TrainService.updateTrain(formValues).then(res=>{
        let users=res.data;
        // localStorage.setItem("register_in_users",JSON.stringify(users));
        alert("Update successful");
        window.location.href="list_train_adm.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("update failed");
    });
   
    }




}