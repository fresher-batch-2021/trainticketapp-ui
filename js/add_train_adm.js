$("#header").load("_header.html");


$(document).ready(function () {

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


    const formValues = {
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

    try {

        //1. Check train No digits
        Validator.isValidTrainNo(trainNo, ErrorMessage.INVALID_TRAIN_NO);

        //2. Check if trainNo already registered
        ValidatorCheck.trainNoValidation(trainNo).then(res => {
            console.table(res.data);
            let data = res.data.docs;

            //2.1 Throw error if trainNo already exists
            if (data.length != 0) {
                throw new Error(ErrorMessage.TRAIN_NO_ALREADY);
            }

            //3. Call API to add Trains
            TrainService.addTrains(formValues).then(res1 => {
                let train_list = res1.data;
                console.log(train_list);

                toastr.success("Train Added successful");

                setTimeout(function () {
                    window.location.href = "list_train_adm.html"
                }, 3000);

            }).catch(err => {
                console.log(err.response.data);
                //toastr.error(ErrorMessage.ADD_TRAIN_FAILED);
                throw new Error(ErrorMessage.ADD_TRAIN_FAILED);
            });

        }).catch(err => {
            console.error(err)
            if (err.message){
                toastr.error(err.message);
            }
            else{
                toastr.error("Unable to validate train No");
            }
        });

    } catch (err) {
        console.error(err.message);
        toastr.error("Error: " + err.message);

    }

}

function list_train() {
    window.location.href = "list_train_adm.html"
}