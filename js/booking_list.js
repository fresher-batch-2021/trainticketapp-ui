$("#header").load("_header.html");

function bookList() {

        let userData = localStorage.getItem("Logged_in_users");
            let user = JSON.parse(userData);
            const userid = user._id;
            console.log("USer Id:" , userid);


             BookService.listBooking().then(res1=>{
                let data = res1.data.rows;
                let book_list = data.map(obj=>obj.doc);
                console.table(book_list);

                let myBookings1 = book_list.filter(obj=>obj.user._id == userid);
                
        let myBookings = myBookings1.filter(obj=>obj.status!=='INACTIVE');

                
                console.log(JSON.stringify(myBookings));
                console.table(myBookings);
        
        
                let i=0;
        

        let content="";
        for (let booklistObj of myBookings)
        {
            i++;

            let cancelBook =`<button type='button'  onclick = "cancel_booking('${booklistObj._id}','${booklistObj._rev}');"> Cancel </button>`;

            const abc = (booklistObj.noTicket)*(booklistObj.individualPrice);

            content= content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + booklistObj.journeyDate + "</td>" + "<td>" + "Rs." + booklistObj.individualPrice + "</td>" + "<td>" + "Rs." + abc + "</td>" + "<td>" + booklistObj.user.name + "</td>" + "<td>" + booklistObj.user.email + "</td>" + "<td>" + cancelBook + "</td></tr>";
        
       
        
        document.querySelector("#abc").innerHTML=content;
        }
    }).catch(err=>{
        console.log(err.response.data);
        alert("Booking failed");
    });
}
bookList();

function cancel_booking(id,rev){
    alert("Do you want to delete this data?");
    console.log(id);
    console.log(rev);
    let url ="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_book/"+id ;
        const dbusername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbpassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
    const basicAuth = 'Basic '  + btoa(dbusername+ ":" +dbpassword);

    // axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}}).then(res => {

    
   axios.get(url, { headers: {'Authorization': basicAuth}}).then(res=>{

    let product  = res.data;
    console.log(product);
    product.status ="INACTIVE";

    axios.put(url, product,  { headers: {'Authorization': basicAuth}}).then(res => {

    alert("Deleted succesfully");

    bookList();
    }).catch(err =>{
        alert("error in deleting");

    })
})
    
}

