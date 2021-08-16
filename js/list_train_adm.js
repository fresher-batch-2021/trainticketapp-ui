  $("#header").load("_header.html");
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
            let trainview =`<input type="button" id="deleteButton" value="Delete" onclick="deleteRow(${listTrain.trainNo})" />`;

            content= content + "<tr><td>" + listTrain.sno + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>"  + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";

            
        document.querySelector("#listTrainDataAdm").innerHTML=content;
        }
        // window.location.href="list.html";
    }).catch(err=>{
        alert("Register failed");
    });
   
}
listData();

function deleteRow(id){
    alert(id);
    alert("Do you want to delete this data?");
    const url =`https://product-mock-api.herokuapp.com/trainapp/api/v1/trains/${id}`;
    axios.delete(url).then(res => {
        alert("deleted succesfully");
        window.location.reload();
    }).catch(err =>{
        console.log(err.response.data);
        alert("error in deleting");
    });
    
  }
