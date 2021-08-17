$("#header").load("_header.html");

function bookList() {


        const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);
        
        
            const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_book/_all_docs?include_docs=true";
        
            axios.get(url, { headers: { Authorization: basicAuth } }).then(res=>{
                let data = res.data.rows;
                let book_list = data.map(obj=>obj.doc);
                console.log(book_list);
        
                // localStorage.setItem("Added_Train",JSON.stringify(res.data));
                // alert("added in local storage");
        
                let i=0;
        

        for (let booklistObj of book_list)
        {
            console.log(booklistObj);
        }

        let content="";
        for (let booklistObj of book_list)
        {
            i=i+1;

            let cancelTrain =`<a href='booking.html?trainName=${booklistObj.trainName}'>Cancel</a>`;

            const abc = (booklistObj.noTicket)*(booklistObj.individualPrice);

            content= content + "<tr><td>" + i + "</td>" + "<td>" + booklistObj.trainNo + "</td>" + "<td>" + booklistObj.name + "</td>" + "<td>" + booklistObj.source + "</td>" + "<td>" + booklistObj.destination + "</td>" + "<td>" + booklistObj.noTicket + "</td>" + "<td>" + booklistObj.journeyDate + "</td>" + "<td>" + "Rs." + booklistObj.individualPrice + "</td>" + "<td>" + "Rs." + abc + "</td>" + "<td>" + cancelTrain + "</td>";
        
        console.log(content);
        
        document.querySelector("#abc").innerHTML=content;
        }
           // window.location.href="list.html";
    }).catch(err=>{
        console.log(err.response.data);
        alert("Booking failed");
    });
}
bookList();