  $("#header").load("_header.html");
        
        const train_list = [
            { sno : "1", trainNo : "12345" , trainName : "Purl City Super Fast Express" , noPassenger : 1500 , sourceStation : "Tuticorin" , destnationStation : "Chennai" , arrival : "02:30" , depart : "02:40" , availableTickets : "500" , ticketPrice : "Rs. 585" , status : "Started" ,action : "Pallavan" },{ sno : "2", trainNo : "98765" , trainName : "Kanyakumari Express" , noPassenger : 500 , sourceStation : "madurai" , destnationStation : "Thiruchendur" , arrival : "14:15" , depart : "14:30" , availableTickets : "400" , ticketPrice : "Rs. 700" , status : "Hold" ,action : "Kanyakumari" },{ sno : "3", trainNo : "05021" , trainName : "Pallavan Express" , noPassenger : 700 , sourceStation : "Nagercoil" , destnationStation : "Tirunelveli" , arrival : "00:00" , depart : "00:20" , availableTickets : "105" , ticketPrice : "Rs. 630" , status : "Waiting" ,action : "Pallavan" }
        ];

        for (let trainlistObj of train_list)
        {
            console.log(trainlistObj);
        }

        let content="";
        for (let trainlistObj of train_list)
        {
            let trainLink =`<a href='booking.html?trainName=${trainlistObj.trainName}'>${trainlistObj.trainName}</a>`;

            
            let trainEdit =`<a href='edit_train_adm.html?trainName=${trainlistObj.trainName}'>Edit</a>`;
            
            let trainview =`<a href='add_train_adm.html?trainName=${trainlistObj.trainName}'>Delete</a>`;

            content= content + "<tr><td>" + trainlistObj.sno + "</td>" + "<td>" + trainlistObj.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + trainlistObj.noPassenger + "</td>" + "<td>" + trainlistObj.sourceStation + "</td>" + "<td>" + trainlistObj.destnationStation + "</td>" + "<td>" + trainlistObj.arrival + "</td>" + "<td>" + trainlistObj.depart + "</td>" + "<td>" + trainlistObj.availableTickets + "</td>" + "<td>" + trainlistObj.ticketPrice + "</td>"  + "<td>" + trainlistObj.status + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";
        }
        console.log(content);
        
        document.querySelector("#listTrainDataAdm").innerHTML=content;