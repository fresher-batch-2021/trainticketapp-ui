$("#header").load("_header.html")

function checkConf(){

    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password1 = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    // const role = document.querySelector("#role").value;

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
        // "role": role,
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
        
        const dbUsername = "apikey-v2-15a2mog1stn0kv0gjnidlq2eoth4psp58f8ov9zs42i6";
        const dbPassword = "aabcfd48d07fe38f4760f6cd11b83b4a";
        const basicAuth = 'Basic ' + btoa(dbUsername + ':' + dbPassword);

        const url="https://b4af4ef2-55e1-4a9b-9b02-8168e5964652-bluemix.cloudantnosqldb.appdomain.cloud/trainticketapp_users";
        axios.post(url,formvalues,{ headers: { 'Authorization': basicAuth } }).then(res=>{
            let users=res.data;
            // localStorage.setItem("register_in_users",JSON.stringify(users));
            alert("Register successful");
            window.location.href="login.html";
        }).catch(err=>{
            console.log(err.response.data);
            alert("Register failed");
        });
       

}
}