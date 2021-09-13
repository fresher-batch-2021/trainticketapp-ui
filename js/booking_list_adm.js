$("#header").load("_header.html");

function bookList() {



    BookService.listBooking().then(res => {
        let data = res.data.rows;
        let book_list = data.map(obj => obj.doc);


        let myBookings = book_list.filter(obj => obj.status !== 'INACTIVE');


        console.log(JSON.stringify(myBookings));
        console.table(myBookings);


        let i = 0;


        for (let booklistObj of myBookings) {
            console.log(booklistObj);
        }

        let content = "";
        for (let booklistObj of myBookings) {

            var booklistObj1 = booklistObj.user;

            i++;
            $("#BOOKINGLIST tbody").empty();

            let cancelBook = `<button type='button'  onclick = "cancel_booking('${booklistObj._id}','${booklistObj._rev}','${booklistObj1.name}','${booklistObj1.email}');"> Cancel </button>`;

            const ticketAmount = (booklistObj.noTicket) * (booklistObj.individualPrice);

            let orderedDate = new Date(booklistObj.journeyDate).toJSON(); //.substr(0, 10);
            let date = moment(new Date(orderedDate)).format("DD-MM-YYYY");

            content = content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + date + "</td>" + "<td>" + '₹' + booklistObj.individualPrice + "</td>" + "<td>" + '₹' + +ticketAmount + "</td>" + "<td>" + booklistObj1.name + "</td>" + "<td>" + booklistObj1.email + "</td>" + "<td>" + cancelBook + "</td></tr>";

            console.log(content);

            $("#BOOKINGLIST tbody").append(content);
        }

    }).catch(err => {
        console.log(err.response.data);
        toastr.error(ErrorMessage.BOOKING_LIST_FAILED);
    });
}
bookList();

function cancel_booking(id, rev, name, email) {
    console.log(id);
    console.log(rev);

    // axios.delete(url+id+"?rev="+rev, { headers: {'Authorization': basicAuth}}).then(res => {

    Swal.fire({
        title: 'Are you sure to Cancel ' + name + '(' + email + ') Tickets?',
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
                'Your file has been cancelled.',
                'success'
            )

            BookService.getBooking(id).then(res1 => {

                let ListBook = res1.data;
                console.log(ListBook);
                ListBook.status = "INACTIVE";

                BookService.updateBook(ListBook).then(res1 => {


                    bookList();
                }).catch(err => {
                    console.error(err);
                    toastr.error(ErrorMessage.DELETE_ERROR);

                })
            })

        }

    })


}