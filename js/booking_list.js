        $("#header").load("_header.html");

        const book_list = [
            { sno : "1", trainNo : "12345" , trainName : "pallavan" , fromStation : "madurai" , toStation : "chennai" , noTicket : 5 , journeyDate : "10-08-2021" , ticketAmount : "Rs. 2000" , status : "waiting"  }, {sno : "2", trainNo : "54321" , trainName : "Purl city" , fromStation : "madurai" , toStation : "Trichy" , noTicket : 2 , journeyDate : "12-08-2021" , ticketAmount : "Rs. 700" , status : "hold"  }
        ];

        for (let booklistObj of book_list)
        {
            console.log(booklistObj);
        }

        let content="";
        for (let booklistObj of book_list)
        {

            let cancelTrain =`<a href='booking.html?trainName=${booklistObj.trainName}'>Cancel</a>`;

            content= content + "<tr><td>" + booklistObj.sno + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.trainName + "</td>" + "<td>" + booklistObj.fromStation + "</td>" + "<td>" + booklistObj.toStation + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + booklistObj.journeyDate + "</td>" + "<td>" + booklistObj.ticketAmount + "</td>" + "<td>" + booklistObj.status + "</td>" + "<td>" + cancelTrain + "</td>";
        }
        console.log(content);
        
        document.querySelector("#abc").innerHTML=content;