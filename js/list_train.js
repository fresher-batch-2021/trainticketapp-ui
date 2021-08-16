$("#header").load("header_loged.html");

function listData() {
    alert("Train Listed successful 11");
var content="";
    const url="https://product-mock-api.herokuapp.com/trainapp/api/v1/trains";
    axios.get(url).then(res=>{
        let train_list = res.data;
        alert("Train Listed successful");
        console.log(train_list);
        alert("yes");
        localStorage.setItem("Added_Train",JSON.stringify(res.data));
        alert("added in local storage");

        for(let listTrain of train_list)
        {
            let trainLink =`<a href='booking.html?name=${listTrain.name}'>${listTrain.name}</a>`;

            let trainEdit =``;
            let trainview =`<input type="button" id="bookButton" value="Book" onclick="bookTrain()" />`;

            content= content + "<tr><td>" + listTrain.sno + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>"  + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";

            
        document.querySelector("#listTrainData").innerHTML=content;
        }
        // window.location.href="list.html";
    }).catch(err=>{
        alert("Register failed");
    });
   

        // const train_list = [
        //     { sno : "1", trainNo : "12345" , trainName : "Purl City Super Fast Express" , noPassenger : 1500 , sourceStation : "Tuticorin" , destnationStation : "Chennai" , arrival : "02:30" , depart : "02:40" , availableTickets : "500" , ticketPrice : "Rs. 585" , status : "Started" ,action : "Pallavan" }
        // ];

        // for (let trainlistObj of train_list)
        // {
        //     console.log(trainlistObj);
        // }

        // let content="";
        // for (let trainlistObj of train_list)
        // {
        //     let trainLink =`<a href='booking.html?trainName=${trainlistObj.trainName}'>${trainlistObj.trainName}</a>`;

            
        //     let trainEdit =`<a href='edit_train_adm.html?trainName=${trainlistObj.trainName}'>Edit</a>`;
            
        //     let trainview =`<a href='add_train_adm.html?trainName=${trainlistObj.trainName}'>Delete</a>`;

        //     content= content + "<tr><td>" + trainlistObj.sno + "</td>" + "<td>" + trainlistObj.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + trainlistObj.noPassenger + "</td>" + "<td>" + trainlistObj.sourceStation + "</td>" + "<td>" + trainlistObj.destnationStation + "</td>" + "<td>" + trainlistObj.arrival + "</td>" + "<td>" + trainlistObj.depart + "</td>" + "<td>" + trainlistObj.availableTickets + "</td>" + "<td>" + trainlistObj.ticketPrice + "</td>"  + "<td>" + trainlistObj.status + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";
        // }
        // console.log(content);
        
        // document.querySelector("#listTrainDataAdm").innerHTML=content;

}
listData();
function bookTrain(){
    window.location.href = "booking.html"
}