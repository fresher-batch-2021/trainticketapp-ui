$("#header").load("_header.html");

function listData() {
    var content = "";

    TrainService.getTrains().then(res => {
        let data = res.data.rows;
        let train_list = data.map(obj => obj.doc);
        let trains = train_list.filter(obj => obj.status !== 'INACTIVE');

        console.log(train_list);

        let i = 0;
        for (let listTrain of trains) {
            i = i + 1;
            
            $("#listTrainDataAdm tbody").empty();

            let trainEdit = `<button onclick="edit_train_detail('${listTrain._id}')">Edit</button>`;

            let trainDelete = `<button type='button'  onclick = "cancel_train('${listTrain._id}','${listTrain._rev}','${listTrain.name}');"> Cancel </button>`;

            content = content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + listTrain.name + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + '₹' + listTrain.price + "</td>" + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + trainDelete + "</td></tr>";

            
            $("#listTrainDataAdm tbody").append(content);

            
        }
    }).catch(err => {
        console.log(err.response.data);
        toastr.error(ErrorMessage.TRAIN_LIST_FAILED);
    });

}
listData();

function cancel_train(id, rev, trainName) {


    console.log(id);
    console.log(rev);
    let url = "https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/" + id;
    const dbusername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
    const dbpassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic ' + btoa(dbusername + ":" + dbpassword);

    // axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}})

    
        Swal.fire({
            title: 'Are you sure to delete ' + trainName + '?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )

    axios.get(url, { headers: { 'Authorization': basicAuth } }).then(res1 => {

        let product = res1.data;
        console.log(product);
        product.status = "INACTIVE";

        axios.put(url, product, { headers: { 'Authorization': basicAuth } }).then(res2 => {


        }).catch(err => {
            toastr.error(ErrorMessage.DELETE_ERROR);

        })

    })
}
          })

}


function isStationContains(trains, stationName) {

    let stations = trains.stations.split(",");
    return stations.includes(stationName);

}


function displaysearchTrains(results) {
    let i = 0;
    let content1 = ``;
    for (let result of results) {
        i = i + 1;

        $("#listTrainDataAdm tbody").empty();

        let trainEdit = `<button onclick="edit_train_detail('${result._id}')">Edit</button>`;

        let trainDelete = `<button type='button'  onclick = "cancel_train('${result._id}','${result._rev}');"> Cancel </button>`;


        content1 = content1 + "<tr><td>" + i + "</td>" + "<td>" + result.trainNo + "</td>" + "<td>" + result.name + "</td>" + "<td>" + result.noPassenger + "</td>" + "<td>" + result.source + "</td>" + "<td>" + result.destination + "</td>" + "<td>" + result.startTime + "</td>" + "<td>" + result.endTime + "</td>" + "<td>" + result.duration + "</td>" + "<td>" + '₹' + result.price + "</td>" + "<td>" + result.stations + "</td>" + "<td>" + trainEdit + " " + trainDelete + "</td></tr>";

        $("#listTrainDataAdm tbody").append(content1);
    }

}

function getStationList() {
    let content = [];
    let value = "";

    TrainService.getTrains().then(res3 => {
        let data = res3.data.rows;
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


$(document).ready (function(){

    console.log("Jquery Loaded");

    $("#admListTrainForm").submit(abc);

});

function abc() {

    event.preventDefault();

    const sourceSearch = $("#sourceStationSearch").val();
    const destinationSearch = $("#destinationStationSearch").val();
    console.log(sourceSearch + "-" + destinationSearch);

    TrainService.getTrains().then(res4 => {
        let data = res4.data.rows;
        let train_list = data.map(obj => obj.doc);

        let filteredTrains = searchTrains(train_list, sourceSearch, destinationSearch);
        console.table(filteredTrains);
        displaysearchTrains(filteredTrains);

    });
}

function add_train(){
    window.location.href = "add_train_adm.html";
}

function edit_train_detail(id_detail){
    window.location.href = `edit_train_adm.html?id=${id_detail}`;
}