$("#header").load("_header.html");

function listData() {

    var content = "";

    UserService.getUsers().then(res => {
        let data = res.data.rows;
        let user_list = data.map(obj => obj.doc);
        let users = user_list.filter(obj => obj.role !== 'admin');


        console.log(user_list);

        let i = 0;
        for (let listUser of users) {
            i = i + 1;


            $("#listUserDataAdm tbody").empty();

            content = content + "<tr><td>" + i + "</td>" + "<td>" + listUser.email + "</td>" + "<td>" + listUser.name + "</td>" + "<td>" + listUser.gender + "</td>" + "<td>" + listUser.mobile + "</td></tr>";


            $("#listUserDataAdm tbody").append(content);
        }
    }).catch(err => {
        console.log(err.response.data);
        toastr.error(ErrorMessage.USER_LIST_FAILED);
    });

}
listData();