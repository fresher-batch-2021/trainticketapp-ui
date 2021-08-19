  $("#header").load("headerAdminLogged.html");
  function listData() {
    // alert("Train Listed successful 11");
var content="";

const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);


    const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/_all_docs?include_docs=true";


    axios.get(url, { headers: { Authorization: basicAuth } }).then(res=>{
        let data = res.data.rows;
        let train_list = data.map(obj=>obj.doc);
        // alert("Train Listed successful");
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
            let trainDelete =`<button type='submit'  onclick = "cancel_train('${listTrain._id}','${listTrain._rev}');"> Cancel </button>`;

            content= content + "<tr><td>" + i + "</td>" + "<td>" + listTrain.trainNo + "</td>" + "<td>" + trainLink + "</td>" + "<td>" + listTrain.noPassenger + "</td>" + "<td>" + listTrain.source + "</td>" + "<td>" + listTrain.destination + "</td>" + "<td>" + listTrain.startTime + "</td>" + "<td>" + listTrain.endTime + "</td>" + "<td>" + listTrain.duration + "</td>" + "<td>" + listTrain.price + "</td>"  + "<td>" + listTrain.stations + "</td>" + "<td>" + trainEdit + " " + trainDelete + "</td></tr>";

            
        document.querySelector("#listTrainDataAdm").innerHTML=content;
        }
        // window.location.href="list.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("Register failed");
    });
   
}
listData();

function cancel_train(id,rev){
    alert("Do you want to delete this data?");
    console.log(id);
    console.log(rev);
    let url ="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_trains/";
        const dbusername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbpassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic '  + btoa(dbusername+ ":" +dbpassword);

    axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}}).then(res => {
    alert("Deleted succesfully");

    }).catch(err =>{
        alert("error in deleting");

    })
    
}