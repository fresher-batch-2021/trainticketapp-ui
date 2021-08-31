$("#header").load("_header.html");

function bookList() {

    
    
    BookService.listBooking().then(res=>{
                let data = res.data.rows;
                let book_list = data.map(obj=>obj.doc);


                let myBookings = book_list.filter(obj=>obj.status!=='INACTIVE');

                
                console.log(JSON.stringify(myBookings));
                console.table(myBookings);
        
                
                let i=0;
        

        for (let booklistObj of myBookings)
        {
            console.log(booklistObj);
        }

        let content="";
        for (let booklistObj of myBookings)
        {
            i++;

            let cancelBook =`<button type='button'  onclick = "cancel_booking('${booklistObj._id}','${booklistObj._rev}');"> Cancel </button>`;

            const abc = (booklistObj.noTicket)*(booklistObj.individualPrice);
            
            let orderedDate = new Date(booklistObj.journeyDate).toJSON(); //.substr(0, 10);
        let date = moment(new Date(orderedDate)).format("DD-MM-YYYY");

            content= content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + date + "</td>" + "<td>" + "Rs." + booklistObj.individualPrice + "</td>" + "<td>" + "Rs." + abc + "</td>" + "<td>" + booklistObj.user.name + "</td>" + "<td>" + booklistObj.user.email + "</td>" + "<td>" + cancelBook + "</td></tr>";
        
        console.log(content);
        
        document.querySelector("#abc").innerHTML=content;
        }
        
    }).catch(err=>{
        console.log(err.response.data);
        toastr.error("Booking failed");
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

    
   axios.get(url, { headers: {'Authorization': basicAuth}}).then(res1=>{

    let product  = res1.data;
    console.log(product);
    product.status ="INACTIVE";

    axios.put(url, product,  { headers: {'Authorization': basicAuth}}).then(res2 => {

    toastr.success("Deleted succesfully");

    bookList();
    }).catch(err =>{
        
        toastr.error("error in deleting");

    })
})
}

