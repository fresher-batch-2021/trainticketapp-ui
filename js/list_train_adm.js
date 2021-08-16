  $("#header").load("_header.html");
  function listData() {
    alert("Train Listed successful 11");
var content="";

const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);


    const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/_all_docs?include_docs=true";


    axios.get(url, { headers: { Authorization: basicAuth } }).then(res=>{
        let data = res.data.rows;
        let train_list = data.map(obj=>obj.doc);
        alert("Train Listed successful");
        console.log(train_list);
       // alert("yes");
        //localStorage.setItem("Added_Train",JSON.stringify(res.data));
        //alert("added in local storage");
let i=0;
        for(let listTrain of train_list)
        {
            i=i+1;
            let trainLink =`<a href='booking.html?name=${listTrain.name}'>${listTrain.name}</a>`;

            let trainEdit =``;
            let trainview =`<input type="button" id="deleteButton" value="Delete" onclick="deleteRow(${listTrain.trainNo})" />`;

            content= content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + listTrain.noPassengers + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>"  + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainview + "</td></tr>";

            
        document.querySelector("#listTrainDataAdm").innerHTML=content;
        }
        // window.location.href="list.html";
    }).catch(err=>{
        console.log(err.response.data);
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
