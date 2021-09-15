$("#header").load("_header.html");

function bookList() {

    let userData = localStorage.getItem("Logged_in_users");
    let user = JSON.parse(userData);
    const userid = user._id;
    console.log("User Id:", userid);


    BookService.listMyBooking(userid).then(res => {
        let myBookings = res.data.docs;

        //let myBookings = myBookings1.filter(obj => obj.status !== 'INACTIVE');


        console.log(JSON.stringify(myBookings));
        console.table(myBookings);


        let i = 0;


        let content = "";
        for (let booklistObj of myBookings) {
            i++;
            let status_name = "";
            let cancelBook= "";
            $("#BOOKINGLIST tbody").empty();


            if(booklistObj.status == "ACTIVE"){


                status_name = "Booked";

                
            cancelBook = `<button type='button'  onclick = "cancel_booking('${booklistObj._id}','${booklistObj._rev}','${booklistObj.name}');"> Cancel </button>`;

            
            const ticketAmount = (booklistObj.noTicket) * (booklistObj.individualPrice);

            let orderedDate = new Date(booklistObj.journeyDate).toJSON(); //.substr(0, 10);
            let date = moment(new Date(orderedDate)).format("DD-MM-YYYY");

            content = content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + date + "</td>" + "<td>" + '₹' + booklistObj.individualPrice + "</td>" + "<td>" + '₹' + ticketAmount + "</td>" + "<td>" + booklistObj.user.email + "</td>" + "<td>" + booklistObj.user.name + "</td>" + "<td>" + status_name + "</td>" + "<td>" + cancelBook + "</td></tr>";
            

            $("#BOOKINGLIST tbody").append(content);

            }
        }

        for (let booklistObj of myBookings) {
            i++;
            let status_name = "";
            let cancelBook= "";
            $("#BOOKINGLIST tbody").empty();


            if(booklistObj.status == "INACTIVE"){
                status_name = "Cancelled";

                cancelBook = ``;

                
            const ticketAmount = (booklistObj.noTicket) * (booklistObj.individualPrice);

            let orderedDate = new Date(booklistObj.journeyDate).toJSON(); //.substr(0, 10);
            let date = moment(new Date(orderedDate)).format("DD-MM-YYYY");

            content = content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + date + "</td>" + "<td>" + '₹' + booklistObj.individualPrice + "</td>" + "<td>" + '₹' + ticketAmount + "</td>" + "<td>" + booklistObj.user.email + "</td>" + "<td>" + booklistObj.user.name + "</td>" + "<td>" + status_name + "</td>" + "<td>" + cancelBook + "</td></tr>";

            

            $("#BOOKINGLIST tbody").append(content);
            }

            



            // $("#BOOKINGLIST tbody").append(content);
        }
    }).catch(err => {
        console.log(err.response.data);
        toastr.error(ErrorMessage.BOOKING_LIST_FAILED);
    });
}
bookList();

function cancel_booking(id, rev, trainName) {


    console.log(id);
    console.log(rev);


    // axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}}).then(res => {


    Swal.fire({
        title: 'Are you sure to Cancel ' + trainName + ' Tickets?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Cancelled!',
                'Your booking has been Cancelled.',
                'success'
            )

            BookService.getBooking(id).then(res1 => {

                //   axios.get(url, { headers: {'Authorization': basicAuth}}).then(res1=>{

                let ListBook = res1.data;
                console.log(ListBook);
                ListBook.status = "INACTIVE";

                BookService.updateBook(ListBook).then(res1 => {

                    // axios.put(url, ListBook,  { headers: {'Authorization': basicAuth}}).then(res2 => {


                    bookList();
                }).catch(err => {

                    toastr.error(ErrorMessage.DELETE_ERROR);

                })
            })
        }
    })




}