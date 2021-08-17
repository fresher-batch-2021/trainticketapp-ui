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

            const totalPrice = (noTicket * ticketAmount);

            let formvalues = {
                "trainNo": trainNo,
                "name": trainName,
                "source": fromStation,
                "destination": toStation,
                "noTicket": noTicket, 
                "journeyDate": journeyDate,
                "individualPrice": ticketAmount,
                "tsotalPrice": totalPrice
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

                
        const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_book";
        axios.post(url,formvalues,{ headers: { 'Authorization': basicAuth } }).then(res=>{
            let users=res.data;
            // localStorage.setItem("register_in_users",JSON.stringify(users));
            alert("book successful");
            window.location.href="booking_list.html";
        }).catch(err=>{
            console.log(err.response.data);
            alert("Register failed");
        });
       


            }

            

    }