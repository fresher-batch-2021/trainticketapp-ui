$("#header").load("_header.html");


$(document).ready (function(){

    console.log("Jquery Loaded");

    $("#editTrainForm").submit(editTrain);

});

function displayValues(){
let params = new URLSearchParams(window.location.search.substr(1));

let _id = params.get("id");
TrainService.getTrain(_id).then(res=>{
    let train = res.data;
    console.log(train);



$("#trainNo").val(train.trainNo);
$("#name").val(train.name);
$("#source").val(train.source);
$("#destination").val(train.destination);
$("#price").val(train.price);
$("#startTime").val(train.startTime);
$("#endTime").val(train.endTime)
$("#noPassenger").val(train.noPassenger);

$("#duration").val(train.duration);

$("#stations").val(train.stations);

$("#_id").val(train._id);
$("#_rev").val(train._rev);

});
}
displayValues();

function resetValue(){

    displayValues();

}

function editTrain() {
    event.preventDefault();
    const trainNo = $("#trainNo").val();
    const name = $("#name").val();
    const id = $("#_id").val();
    const rev = $("#_rev").val();
    const noPassenger = $("#noPassenger").val();
    const source = $("#source").val();
    const destination = $("#destination").val();
    const stations = $("#stations").val();
    const price = $("#price").val();
    const startTime = $("#startTime").val();
    const endTime = $("#endTime").val();
    const duration = $("#duration").val();


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
        
        toastr.error(ErrorMessage.INVALID_TRAIN_NO);
    }
    else{
    
   
        TrainService.updateTrain(formValues).then(res=>{
        let users=res.data;
        console.log(users);
        
        toastr.success("Update successful");

        setTimeout(function () {
            window.location.href = "list_train_adm.html"
        }, 3000);

    }).catch(err=>{
        console.log(err.response.data);
        toastr.error(ErrorMessage.UPDATE_TRAIN_FAILED);
    });
   
    }




}