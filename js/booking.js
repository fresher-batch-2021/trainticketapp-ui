$("#header").load("_header.html");

function displayValues(){
            let params = new URLSearchParams(window.location.search.substr(1));

            
let _id = params.get("id");
TrainService.getTrain(_id).then(res=>{
    let train = res.data;
    console.log(train);

            $("#trainNo").val(train.trainNo);
            // $("#trainNo").val(train.trainNo);
            $("#trainName").val(train.name);
            $("#ticketAmount").val(train.price);

            let sourceStation = params.get("source");
            $("#fromStation").val(sourceStation);
            let destinationStation = params.get("destination");
            $("#toStation").val(destinationStation);
            
});
}
displayValues();

function resetValue(){

    displayValues();

}
            
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

            console.log(trainNo + "+" + trainName + "+" + fromStation + "+" + toStation + "+" + noTicket + "+" +journeyDate + "+" + ticketAmount);

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
              
            toastr.error("please login");

            setTimeout(function () {
                window.location.href = "login.html"
            }, 3000);

            }
            else {
              console.log("user : ", user);

        try{
        Validator.isValidTrainTicket(noTicket, "Tickets Must be more than zero");

                
const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";

const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_book";

axios.post(url,formValues,{ headers: { 'Authorization': basicAuth } }).then(res=>{
            let users=res.data;
            console.log(users);

            
            toastr.success("book successful");
            setTimeout(function () {
                window.location.href = "booking_list.html"
            }, 3000);

        }).catch(err=>{
            console.log(err.response.data);
            toastr.error("Booking failed");
        });
       


            }
              
            catch(err){
                console.error(err.message);
                
            toastr.error("Error: " + err.message);

            }
                }

    }


    
function setDate(){
    let today = new Date().toJSON().substr(0,10);
    document.querySelector("#journeyDate").setAttribute("min", today);

}
setDate();