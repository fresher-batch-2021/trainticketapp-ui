
$("#header").load("_header.html");

function loginPage() {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    console.log(email);
    const password1 = document.querySelector("#password").value;
    console.log(password1);
    const roles = document.querySelectorAll("#role");

    let role;

    roles.forEach(roleRadio => {
        if (roleRadio.checked) {
            role = roleRadio.value;
        }
    });
    console.log(role);

    console.log(email + ":" + password1 + ":" + role);

    let formvalues = {
        "email": email,
        "password": password1,
        "role": role,

    };
    console.log(formvalues);
    try {
        Validator.isValidString(email, "Email is Mandatory");

        Validator.isValidString(password1, "Password is Mandatory");

        UserService.login(email, password1, role).then(res => {
            let data = res.data.docs;
            console.log(data);
            if (data.length == 0) {
                toastr.error("Invalid login credentials");

            }

            else {

                const user = data[0];
                localStorage.setItem("Logged_in_users", JSON.stringify(user));
                console.log("Role:", role);
                
                if (role == "admin") {
                    toastr.success("login succesful");
                    console.log("toastr completed");
                    setTimeout(function () {
                        window.location.href = "add_train_adm.html"
                    }, 3000);
                }
                else if (role == "user") {
                    toastr.success("login succesful");
                    setTimeout(function () {
                        window.location.href = "list_train.html"
                    }, 3000);

                }
            }


        }).catch(err => {
            console.log(err.response.data);
            toastr.error("login failed");
            
        });
    }

    catch (err) {
        console.error(err.message);
        toastr.error("Error: " + err.message);
        
    }
}
