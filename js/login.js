$("#header").load("_header.html");


$(document).ready(function () {

    console.log("Jquery Loaded");

    $("#loginForm").submit(loginPage);

});


function loginPage() {
    event.preventDefault();
    const email = $("#email").val();
    console.log(email);
    const password1 = $("#password").val();
    console.log(password1);
    const role = $("#role:checked").val();

    console.log(role);

    console.log(email + ":" + password1 + ":" + role);

    let formvalues = {
        "email": email,
        "password": password1,
        "role": role,

    };
    console.log(formvalues);
    try {
        Validator.isValidString(email, ErrorMessage.EMAIL_MANDATORY);

        Validator.isValidString(password1, ErrorMessage.PASSWORD_MANDATORY);

        UserService.login(email, password1, role).then(res => {
            let data = res.data.docs;
            console.log(data);
            if (data.length == 0) {
                toastr.error(ErrorMessage.INVALID_LOGIN);

            } else {

                const user = data[0];
                localStorage.setItem("Logged_in_users", JSON.stringify(user));
                console.log("Role:", role);

                if (role == "admin") {
                    toastr.success("login succesful");
                    console.log("toastr completed");
                    setTimeout(function () {
                        window.location.href = "add_train_adm.html"
                    }, 3000);
                } else if (role == "user") {
                    toastr.success("login succesful");
                    setTimeout(function () {
                        window.location.href = "list_train.html"
                    }, 3000);

                }
            }


        }).catch(err => {
            console.log(err.response.data);
            toastr.error(ErrorMessage.LOGIN_FAILED);

        });
    } catch (err) {
        console.error(err.message);
        toastr.error("Error: " + err.message);

    }
}