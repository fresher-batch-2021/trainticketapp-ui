$("#header").load("_header.html");

function displayValues() {
    let params = new URLSearchParams(window.location.search.substr(1));


    let _id = params.get("id");
    TrainService.getTrain(_id).then(res => {
        let train = res.data;
        console.log(train);

        $("#trainNo").val(train.trainNo);
        $("#trainName").val(train.name);
        $("#ticketAmount").val(train.price);

        let sourceStation = params.get("source");
        $("#fromStation").val(sourceStation);
        let destinationStation = params.get("destination");
        $("#toStation").val(destinationStation);

    });
}
displayValues();

function resetValue() {

    displayValues();

}



$(document).ready(function () {

    console.log("Jquery Loaded");

    $("#bookingForm").submit(bookingForm);

});

function bookingForm() {
    event.preventDefault();
    const trainNo = $("#trainNo").val();
    const trainName = $("#trainName").val();
    const fromStation = $("#fromStation").val();
    const toStation = $("#toStation").val();
    const noTicket = $("#noTicket").val();
    const journeyDate = $("#journeyDate").val();
    const ticketAmount = $("#ticketAmount").val();


    let userData = localStorage.getItem("Logged_in_users");
    let user = JSON.parse(userData);
    const email = user.email;

    console.log(trainNo + "+" + trainName + "+" + fromStation + "+" + toStation + "+" + noTicket + "+" + journeyDate + "+" + ticketAmount);

    const totalPrice = (noTicket * ticketAmount);

    let formValues = {
        "trainNo": trainNo,
        "name": trainName,
        "source": fromStation,
        "destination": toStation,
        "noTicket": noTicket,
        "journeyDate": journeyDate,
        "individualPrice": ticketAmount,
        "totalPrice": totalPrice,
        "user": user,
        "email": email
    };
    console.log(formValues);

    userData = localStorage.getItem("Logged_in_users");
    user = JSON.parse(userData);
    console.log(user);
    console.log(user.email);
    if (user == null) {
        console.log("user : ", user);

        toastr.error(ErrorMessage.LOGIN_MUST);

        setTimeout(function () {
            window.location.href = "login.html"
        }, 3000);

    } else {
        console.log("user : ", user);

        try {
            Validator.isValidTrainTicket(noTicket, ErrorMessage.TICKET_COUNT);


            BookService.addBooking(formValues).then(res => {
                let users = res.data;
                console.log(users);


                toastr.success("book successful");
                setTimeout(function () {
                    window.location.href = "booking_list.html"
                }, 3000);

            }).catch(err => {
                console.log(err.response);
                toastr.error(ErrorMessage.BOOKING_FAILED);
            });



        } catch (err) {
            console.error(err.message);

            toastr.error("Error: " + err.message);

        }
    }

}



function setDate() {
    let today = new Date().toJSON().substr(0, 10);

    $("#journeyDate").attr("min", today);

}
setDate();

function list_train() {
    window.location.href = "list_train.html"
}