$("#header").load("_header.html");


function listData() {
    var content = "";

    TrainService.getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);
        console.log(JSON.stringify(train_list));


        let trainsList = train_list.filter(obj => obj.status !== 'INACTIVE');


        let i = 0;

        for (let listTrain of trainsList) {
            i++;

            $("#listTrainData tbody").empty();


            let trainEdit = ``;
            let trainview = `<a href='booking.html?id=${listTrain._id}&source=${listTrain.source}&destination=${listTrain.destination}'>Book</a>`;

            content = content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + listTrain.name + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + '₹' + listTrain.price + "</td>" + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";


            $("#listTrainData tbody").append(content);
        }
    }).catch(err => {
        console.log(err.response.data);
        toastr.error(ErrorMessage.TRAIN_LIST_FAILED);

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


    let trainsList = results.filter(obj => obj.status !== 'INACTIVE');

    const sourceSearch = $("#sourceStationSearch").val();
    const destinationSearch = $("#destinationStationSearch").val();

    let content1 = ``;
    for (let result of trainsList) {


        i = i + 1;

        $("#listTrainData tbody").empty();


        let trainview = `<a href='booking.html?id=${result._id}&source=${sourceSearch}&destination=${destinationSearch}'>Book</a>`;

        content1 = content1 + "<tr><td>" + i + "</td>" + "<td>" + result.trainNo + "</td>" + "<td>" + result.name + "</td>" + "<td>" + result.noPassenger + "</td>" + "<td>" + result.source + "</td>" + "<td>" + result.destination + "</td>" + "<td>" + result.startTime + "</td>" + "<td>" + result.endTime + "</td>" + "<td>" + result.duration + "</td>" + "<td>" + '₹' + result.price + "</td>" + "<td>" + result.stations + "</td>" + "<td>" + trainview + "</td></tr>";

        $("#listTrainData tbody").append(content1);
    }

}

function getStationList() {
    let content = [];
    let value = "";

    TrainService.getTrains().then(res2 => {
        let data = res2.data.rows;
        let trains = data.map(obj => obj.doc);

        for (let trainObj of trains) {
            let stations = trainObj.stations.split(",");
            content.push(...stations);
        }

        let sortedStations = _.uniq(content, true).sort();
        console.log(sortedStations);

        for (let station of sortedStations) {
            value += `
                <option value="${station}">${station}</option>
                `;
        }
        $("#sourceStationSearch").html(value);
        $("#destinationStationSearch").html(value);





        console.log(content);

    });
}

getStationList();


function searchTrains(trains, sourceSearch, destinationSearch) {



    let results = trains.filter(obj => (obj.source == sourceSearch && obj.destination == destinationSearch) || (isStationContains(obj, sourceSearch) && isStationContains(obj, destinationSearch)));

    return results;

}


$(document).ready(function () {

    console.log("Jquery Loaded");

    $("#listTrainForm").submit(abc);

});

function abc() {

    event.preventDefault();

    const sourceSearch = $("#sourceStationSearch").val();
    const destinationSearch = $("#destinationStationSearch").val();
    console.log(sourceSearch + "-" + destinationSearch);
    if (sourceSearch == destinationSearch) {

        toastr.error(ErrorMessage.CHECK_CONDITION);

        setTimeout(function () {
            console.log("toastr completed");
        }, 3000);

        $("#listTrainData tbody").empty();

        return false;
    }

    TrainService.getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);

        let filteredTrains = searchTrains(train_list, sourceSearch, destinationSearch);
        console.table(filteredTrains);
        displaysearchTrains(filteredTrains);

    });
}


function setDate() {
    let today = new Date().toJSON().substr(0, 10);

    $("#depature").attr("min", today);
    $("#depature").val(today);
}
setDate();