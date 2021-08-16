
        $("#header").load("_header.html");

        function loginPage() {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            console.log(email);
            const password1 = document.querySelector("#password").value;
            console.log(password1);
            const role = document.querySelectorAll("#role").value;

            console.log(email + ":" + password1 + ":" + role);

            let formvalues = {
                "email": email,
                "password": password1

            };
            console.log(formvalues);
            if(email == "" || email == null || email.trim() == ""){
                alert("Invalid email");
            }
            else{
                
            if(password1.length < 4){
                alert("Invalid Password");
            }
            else{

                
        const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

                const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_users/_find";

                const requestData = {
                    selector: {
                    email: email,
                    password: password1
                },
                fields: ["_id", "name", "email", "role"],
            };

                axios.post(url, requestData, { headers : { Authorization : basicAuth } }).then((res) => {
                    let data = res.data.docs;
                    console.log(data);
                    if(data.length == 0) {
                        alert("Invalid login credentials");

                    }
                    else{

                        const user = data[0];
                        localStorage.setItem("Logged_in_users",JSON.stringify(user));
                        alert("successfully login");
                        window.location.href="list_train.html";
                    }

                    // // localStorage.setItem("Logged_in_users",JSON.stringify(users));
                    // alert("login succesful");
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
        }



        }
    
