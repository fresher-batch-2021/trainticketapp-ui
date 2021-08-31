            $("#header").load("_header.html");

            let params = new URLSearchParams(window.location.search.substr(1));
            let trainNumber = params.get("trainNo");
            document.querySelector("#trainNo").value=trainNumber;
            let Nametrain = params.get("name");
            document.querySelector("#trainName").value=Nametrain;
            let sourceStation = params.get("source");
            document.querySelector("#fromStation").value=sourceStation;
            let destinationStation = params.get("destination");
            document.querySelector("#toStation").value=destinationStation;
            let ticketPrice = params.get("price");
             document.querySelector("#ticketAmount").value=ticketPrice;

            
        function bookingForm() {
            event.preventDefault();
            const trainNo = document.querySelector("#trainNo").value;
            const trainName = document.querySelector("#trainName").value;
            const fromStation = document.querySelector("#fromStation").value;
            const toStation = document.querySelector("#toStation").value;
            const noTicket = document.querySelector("#noTicket").value;
            const journeyDate = document.querySelector("#journeyDate").value;
            const ticketAmount = document.querySelector("#ticketAmount").value;

            
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

                
        BookService.addBooking(formValues).then(res=>{
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