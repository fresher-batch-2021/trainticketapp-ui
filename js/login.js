
        $("#header").load("_header.html");

        function loginPage() {
            event.preventDefault();
            const email = document.querySelector("#email").value;
            console.log(email);
            const password1 = document.querySelector("#password").value;
            console.log(password1);

            console.log(email + "+" + password1);

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
                const url="https://product-mock-api.herokuapp.com/trainapp/api/v1/auth/login";
                axios.post(url,formvalues).then(res=>{
                    alert("login succesful");
                    window.location.href="list_train.html";
                }).catch(err=>{
                    alert("login failed");
                });
               
              
            }
        }



        }
    
