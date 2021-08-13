
    function checkLogin() {
        let userStr = localStorage.getItem("LOGGED_IN_USER");
        let user = userStr != null ? JSON.parse(userStr):null;
        if (user != null){
            document.querySelector("#loggedIn").innerHTML = "Welcome <a href = 'profile.html'>" + user.name + "</a>  &nbsp;<a href='#' onclick='logout()'> Logout</a>";
        }
        }
        checkLogin();
        function logout(){
                localStorage.removeItem("LOGGED_IN_USER");
                window.location.href="login.html";
        }
        