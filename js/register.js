$("#header").load("_header.html")

function checkConf(){

    event.preventDefault();
    const email = $("#email").val();
    const password1 = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();
    
    const role= "user";

    const firstName = $("#firstName").val();
    const middleName = $("#middleName").val();
    const lastName = $("#lastName").val();
    const dob = $("#dob").val();


    const mobile = $("#mobile").val();
    const gender = $("#gender:checked").val();
    

    console.log(email + "+" + password1 + "+" + confirmPassword + "+" + role + "+" + firstName + "+" + middleName + "+" + lastName + "+" + gender + "+" + dob +"+" + mobile);

    let formValues = {
        "email": email,
        "password": password1,
        "confirmPassword": confirmPassword,
        "role": role,
        "name": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "gender": gender,
        "dob": dob,
        "mobile": mobile
    };
    console.log(formValues);

    
    ValidatorCheck.emailValidation(email).then(res => {
            console.table(res.data);
            let data = res.data.docs;
            
            if (data != "") {
                toastr.error("Email already exist enter different Email");
                
                return;
            }

            try{

     
                Validator.isValidString(email, "Email is Mandatory");
                Validator.isValidPassword(password1, confirmPassword, "Invalid Password");
                Validator.isValidMobile(mobile, "Invalid Mobile Number");
                
                    
                    UserService.register(formValues).then(res1=>{
                        let users=res1.data;
                        console.log(users);
                        toastr.success("Register successful");

                        setTimeout(function () {
                            window.location.href = "login.html"
                        }, 3000);

                        // window.location.href="login.html";
                    }).catch(err=>{
                        console.log(err.response.data);
                        toastr.error("Register failed");
                    });
                   
            
            
            }
            catch(err){
                console.error(err.message);
                toastr.error("Error: " + err.message);
            }


        }).catch(err => {
            console.log(err.response.data)
        });
        
           




}

function setDate(){
    let today = new Date().toJSON().substr(0,10);
    document.querySelector("#dob").setAttribute("max", today);

}
setDate();