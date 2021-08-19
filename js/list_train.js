$("#header").load("header_loged.html");

function getTrains(){
 
    
    const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
    const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);


    const url = "https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/_all_docs?include_docs=true";

    return axios.get(url, { headers: { Authorization: basicAuth } });

}

function listData() {
    var content = "";

    getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);
        console.log(JSON.stringify(train_list));

        // localStorage.setItem("Added_Train",JSON.stringify(res.data));
        // //alert("added in local storage");

        let i = 0;

        for (let listTrain of train_list) {
            i++;

            let trainLink = `<a href='booking.html?name=${listTrain.name}&trainNo=${listTrain.trainNo}&source=${listTrain.source}&destination=${listTrain.destination}&price=${listTrain.price}'>${listTrain.name}</a>`;

            // let trainview = `<input type="button" id="bookButton" value="Book" onclick="bookTrain()" />`;


            let trainEdit = ``;
            let trainview = `<a href='booking.html?name=${listTrain.name}&trainNo=${listTrain.trainNo}&source=${listTrain.source}&destination=${listTrain.destination}&price=${listTrain.price}'>Book</a>`;

            content = content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>" + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";


            document.querySelector("#listTrainData").innerHTML = content;
        }
        // window.location.href="list.html";
    }).catch(err => {
        console.log(err.response.data);
        //alert("Register failed");
    });


}
listData();
function bookTrain() {
    window.location.href = "booking.html"
}


function isStationContains(trains, stationName) {

    let stations = trains.stations.split(",");
    return stations.includes(stationName);

}


function displaysearchTrains(results) {
    let i = 0;
    let content1 = `<table>
   `;
    for (let result of results) {
        i = i + 1;
        trainLink = `<a href='booking.html?name=${result.name}&trainNo=${result.trainNo}&source=${result.source}&destination=${result.destination}&price=${result.price}'>${result.name}</a>`;

        trainEdit = ``;
        trainview = `<a href='booking.html?name=${result.name}&trainNo=${result.trainNo}&source=${result.source}&destination=${result.destination}&price=${result.price}'>Book</a>`;

        content1  = content1 + "<tr><td>" + i + "</td>" + "<td>" + result.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + result.noPassenger + "</td>" + "<td>" + result.source + "</td>" + "<td>" + result.destination + "</td>" + "<td>" + result.startTime + "</td>" + "<td>" + result.endTime + "</td>" + "<td>" + result.duration + "</td>" + "<td>" + result.price + "</td>" + "<td>" + result.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";
        
        // += `<tr>
        // <td> i </td>
        // <td>${result.trainNo}</td>
        // <td>${result.name}</td>
        // <td>${result.noPassenger}</td>
        // <td>${result.source}</td>
        // <td>${result.destination}</td>
        // <td>${result.startTime}</td>
        // <td>${result.endTime}</td>
        // <td>${result.duration}</td>
        // <td>${result.endTime}</td>
        // <td>${result.duration}</td>
        // </tr>`;
    }

    document.querySelector("#listTrainData").innerHTML = content1;
}

function getStationList() {
    let i = 0;
    let content = [];
    let value="";
    
    getTrains().then(res => {
        let data = res.data.rows;
        let trains = data.map(obj => obj.doc);    

    for (let trainObj of trains) {
        let stations= trainObj.stations.split(",");
        content.push(...stations);
            for(let station of stations){
                value+=`
                <option value="${station}">${station}</option>
                `;
            }
            document.querySelector("#sourceStationSearch").innerHTML = value;
            document.querySelector("#destinationStationSearch").innerHTML = value;

        
        
    
    }
    console.log(content);
//    document.querySelector("#listTrainData").innerHTML = content;

    });
}

getStationList();


function searchTrains(trains, sourceSearch, destinationSearch) {

    let results = trains.filter(obj => (obj.source == sourceSearch && obj.destination == destinationSearch) || (isStationContains(obj, sourceSearch) && isStationContains(obj, destinationSearch)));
    
    return results;

}


function abc() {

    event.preventDefault();

    const sourceSearch = document.querySelector("#sourceStationSearch").value;
    const destinationSearch = document.querySelector("#destinationStationSearch").value;
    console.log(sourceSearch + "-" + destinationSearch);

    getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);    
    
        let filteredTrains = searchTrains(train_list, sourceSearch, destinationSearch);
        console.table(filteredTrains);
        displaysearchTrains(filteredTrains);

    });
}