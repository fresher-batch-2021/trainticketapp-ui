            $("#header").load("_header.html");

            
        function bookingForm() {
            event.preventDefault();
            const trainNo = document.querySelector("#trainNo").value;
            const trainName = document.querySelector("#trainName").value;
            const fromStation = document.querySelector("#fromStation").value;
            const toStation = document.querySelector("#toStation").value;
            const noTicket = document.querySelector("#noTicket").value;
            const journeyDate = document.querySelector("#journeyDate").value;
            const ticketAmount = document.querySelector("#ticketAmount").value;

            console.log(trainNo + "+" + trainName + "+" + fromStation + "+" + toStation + "+" + noTicket + "+" +journeyDate + "+" + ticketAmount);

            let formvalues = {
                "trainNo": trainNo,
                "trainName": trainName,
                "fromStation": fromStation,
                "toStation": toStation,
                "noTicket": noTicket, 
                "journeyDate": journeyDate,
                "ticketAmount": ticketAmount
            };
            console.log(formvalues);

            if(trainNo.length != 5){
                alert("Invalid Train no");
            }
            else if(noTicket <= 0 ){
                alert("Ticket counts Must be more than zero");
                }
                else
                {
                 alert("Form submission completed");
                    window.location.href = "booking_list.html";
                }

            

    }