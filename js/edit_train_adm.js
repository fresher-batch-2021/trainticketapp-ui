$("#header").load("_header.html");


function editTrain() {
    event.preventDefault();
    const trainNo = document.querySelector("#trainNo").value;
    const trainName = document.querySelector("#trainName").value;
    const noPassenger = document.querySelector("#noPassenger").value;
    const sourceStation = document.querySelector("#sourceStation").value;
    const destinationStation = document.querySelector("#destinationStation").value;
    const availableTickets = document.querySelector("#availableTickets").value;
    const ticketPrice = document.querySelector("#ticketPrice").value;

    console.log(trainNo + "+" + trainName + "+" + noPassenger + "+" + sourceStation + "+" + destinationStation + "+" + availableTickets + "+" + ticketPrice);

    let formvalues = {
        "trainNo": trainNo,
        "trainName": trainName,
        "noPassenger": noPassenger,
        "sourceStation": sourceStation,
        "destinationStation": destinationStation,
        "availableTickets": availableTickets,
        "ticketPrice": ticketPrice
    };
    console.log(formvalues);
    alert("Form submission completed");
    window.location.href = "list_train_adm.html";


}