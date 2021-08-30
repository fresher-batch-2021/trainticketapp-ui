$("#header").load("_header.html")
$("#footer").load("footer.html")

function checkConf(){

    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password1 = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    // const roles = document.querySelectorAll("#role");

    // let role ;
    
    // roles.forEach(roleRadio=>{
    //   if (roleRadio.checked){
    //       role = roleRadio.value;
    //   }
    // });
    // console.log(role);

    const role= "user";

    const firstName = document.querySelector("#firstName").value;
    const middleName = document.querySelector("#middleName").value;
    const lastName = document.querySelector("#lastName").value;
    const dob = document.querySelector("#dob").value;


    const mobile = document.querySelector("#mobile").value;
    
    const genders = document.querySelectorAll("#gender");
    
    let gender ;
    
    genders.forEach(genderRadio=>{
      if (genderRadio.checked){
        gender = genderRadio.value;
      }
    });
    console.log(gender);


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
                alert("email already exist enter different email")
                //window.location.reload();
                return;
                // throw new Error("email already exist")
            }

            try{

     
                Validator.isValidString(email, "Email is Mandatory");
                Validator.isValidPassword(password1, confirmPassword, "Invalid Password");
                Validator.isValidMobile(mobile, "Invalid Mobile Number");
                
                // if(email == "" || email == null || email.trim() == ""){
                //     alert("Invalid Email");
                // }
                // else if(password1.length < 4 || confirmPassword.length < 4 || password1 != confirmPassword){
                //     alert("Invalid Password");
                // }
                // else if(mobile.length != 10){
                //     alert("Invalid Mobile Number");
                // }
            
                // else{
                    
                    UserService.register(formValues).then(res=>{
                        let users=res.data;
                        // localStorage.setItem("register_in_users",JSON.stringify(users));
                        alert("Register successful");
                        window.location.href="login.html";
                    }).catch(err=>{
                        console.log(err.response.data);
                        alert("Register failed");
                    });
                   
            
            
            }
            catch(err){
                console.error(err.message);
                alert("Error: " + err.message);
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

// <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.6/dayjs.min.js" integrity="sha512-bwD3VD/j6ypSSnyjuaURidZksoVx3L1RPvTkleC48SbHCZsemT3VKMD39KknPnH728LLXVMTisESIBOAb5/W0Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
// function setDate() {
//     let todayObj = new Date();
//     let previousDay = dayjs().subtract(1, 'day').toDate();
//     let today = previousDay.toJSON().substr(0, 10);
//     document.querySelector("#dob").setAttribute("max", today);

// }

