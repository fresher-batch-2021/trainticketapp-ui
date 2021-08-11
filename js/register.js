$("#header").load("_header.html")

function checkConf(){

    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password1 = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const firstName = document.querySelector("#firstName").value;
    const middleName = document.querySelector("#middleName").value;
    const lastName = document.querySelector("#lastName").value;
    const female = document.querySelector("#female").value;
    const male = document.querySelector("#male").value;
    const dob = document.querySelector("#dob").value;
    const mobile = document.querySelector("#mobile").value;

    console.log(email + "+" + password1 + "+" + confirmPassword + "+" + firstName + "+" + middleName + "+" + lastName + "+" + female + "+" + male + "+" + dob +"+" + mobile);

    let formvalues = {
        "email": email,
        "password": password1,
        "confirmPassword": confirmPassword,
        "name": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "female": female,
        "male": male,
        "dob": dob,
        "mobile": mobile
    };
    console.log(formvalues);


    if(email == "" || email == null || email.trim() == ""){
        alert("Invalid Email");
    }
    else if(password1.length < 4 || confirmPassword < 4 || password1 != confirmPassword){
        alert("Invalid Password");
    }
    else if(mobile.length != 10){
        alert("Invalid Mobile Number");
    }

    else{
        
        const url="https://product-mock-api.herokuapp.com/trainapp/api/v1/auth/register";
        axios.post(url,formvalues).then(res=>{
            alert("Register successful");
            window.location.href="login.html";
        }).catch(err=>{
            alert("Register failed");
        });
       

}
}