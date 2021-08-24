            $("#header").load("header_loged.html");

            let params = new URLSearchParams(window.location.search.substr(1));
            let trainNumber = params.get("trainNo");
            document.querySelector("#trainNo").value=trainNumber;
            let Nametrain = params.get("name");
            document.querySelector("#trainName").value=Nametrain;
            let sourceStation = params.get("source");
            document.querySelector("#fromStation").value=sourceStation;
            destinationStation = params.get("destination");
            document.querySelector("#toStation").value=destinationStation;
            ticketPrice = params.get("price");
            let journeyDate = document.querySelector("#journeyDate").value;
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
            const userid = user._id;
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
              alert("please login");
              window.location.href = "login.html";
            }
            else {
              console.log("user : ", user);
              alert("done");


            if(trainNo.length != 5){
                alert("Invalid Train no");
            }
            else if(noTicket <= 0 ){
                alert("Ticket counts Must be more than zero");
             }
            else
            {

                
    BookService.addBooking(formValues).then(res=>{
            let users=res.data;
            // localStorage.setItem("register_in_users",JSON.stringify(users));
            alert("book successful");
            // window.location.href="booking_list.html";
        }).catch(err=>{
            console.log(err.response.data);
            alert("Booking failed");
        });
       


            }

        }
            

    }

    
function setDate(){
    let today = new Date().toJSON().substr(0,10);
    document.querySelector("#journeyDate").setAttribute("min", today);

}
setDate();