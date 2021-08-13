$("#header").load("_header.html");

const train_list = [
    { sno : "1", trainNo : "12345" , trainName : "Purl City Super Fast Express" , noPassenger : 1500 , sourceStation : "Tuticorin" , destinationStation : "Chennai" , arrival : "02:30" , depart : "02:40" , noSeatAvailable : "1030", ticketPrice : "Rs. 585" , status : "Started" ,action : "Pallavan" }
    
    ,{ sno : "2", trainNo : "98765" , trainName : "Kanyakumari Express" , noPassenger : 500 , sourceStation : "madurai" , destinationStation : "Thiruchendur" , arrival : "14:15" , depart : "14:30" , noSeatAvailable : "243", ticketPrice : "Rs. 700" , status : "Hold" ,action : "Kanyakumari" },{ sno : "3", trainNo : "05021" , trainName : "Pallavan Express" , noPassenger : 700 , sourceStation : "Nagercoil" , destinationStation : "Tirunelveli" , arrival : "00:00" , depart : "00:20" , noSeatAvailable : "0", ticketPrice : "Rs. 630" , status : "Waiting" ,action : "Pallavan" }
];

for (let trainlistObj of train_list)
{
    
    console.log(trainlistObj);
}

let content="";
for (let trainlistObj of train_list)
{

    let trainLink =`<a onclick="sendingTrainData(${trainlistObj.trainNo},'${trainlistObj.trainName}','${trainlistObj.sourceStation}','${trainlistObj.destinationStation}')" href='booking.html?trainName=${trainlistObj.trainName}'>${trainlistObj.trainName}</a>`;
    
    let trainview =`<a href='booking.html?trainName=${trainlistObj.trainName}'>Book</a>`;

    content= content + "<tr><td>" + trainlistObj.sno + "</td>" + "<td>" + trainlistObj.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + trainlistObj.noPassenger + "</td>" + "<td>" + trainlistObj.sourceStation + "</td>" + "<td>" + trainlistObj.destinationStation + "</td>" + "<td>" + trainlistObj.arrival + "</td>" + "<td>" + trainlistObj.depart + "</td>" + "<td>" + trainlistObj.noSeatAvailable + "</td>" + "<td>" + trainlistObj.ticketPrice + "</td>" + "<td>" + trainlistObj.status + "</td>" + "<td>" + trainview + "</td></tr>";
}
console.log(content);

document.querySelector("#listTrainData").innerHTML=content;

function sendingTrainData(trainNo,trainName,sourceStation,destinationStation){
    alert(trainNo);
    let trainObj={No:trainNo,name:trainName,srcStn:sourceStation,dstStn:destinationStation};
    localStorage.setItem("trainData",JSON.stringify(trainObj));
// console.log(localStorage.getItem("trainData"));
}