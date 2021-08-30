
        $("#header").load("_header.html");

        function loginPage() {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            console.log(email);
            const password1 = document.querySelector("#password").value;
            console.log(password1);
            const roles = document.querySelectorAll("#role");
        
            let role ;
            
            roles.forEach(roleRadio=>{
              if (roleRadio.checked){
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
        try{
            Validator.isValidString(email, "Email is Mandatory");
            
            Validator.isValidString(password1, "Password is Mandatory");

            // if(email == "" || email == null || email.trim() == ""){
            //     alert("Invalid email");
            // }
            // else{
                
            // if(password1.length < 4){
            //     alert("Invalid Password");
            // }
            // else{
                // axios.post(url, requestData, { headers : { Authorization : basicAuth } }).then((res) => {
                    UserService.login(email,password1,role).then(res=>{
                    let data = res.data.docs;
                    console.log(data);
                    if(data.length == 0) {
                        alert("Invalid login credentials");

                    }
                    else{

                        const user = data[0];
                        localStorage.setItem("Logged_in_users",JSON.stringify(user));
                        alert("login succesful");
                        if(role == "admin"){
                            window.location.href="add_train_adm.html";
                        }
                        else if(role == "user"){
                        window.location.href="list_train.html";
                        }
                    }

                    // localStorage.setItem("Logged_in_users",JSON.stringify(users));
                    
                    // if(users.role == "admin"){
                    //     window.location.href="add_train_adm.html";
                    // }
                    // else{
                    // window.location.href="list_train.html";
                    // }
                }).catch(err=>{
                     console.log(err.response.data);
                    alert("login failed");
                });
            }
              
    catch(err){
        console.error(err.message);
        alert("Error: " + err.message);
    }
        }
