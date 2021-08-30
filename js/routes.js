const routes = [
    { path: 'index.html' },
    { path: 'product.html' },
    { path: 'add_train_adm.html', role: ["admin"] },
    { path: 'list_train_adm.html', role: ["admin"] },
    { path: 'list_users_adm.html', role: ["admin"] },
    { path: 'booking_list_adm.html', role: ["admin"] },
    { path: 'edit_train_adm.html', role: ["admin"] },
    { path: 'aboutus.html' },
    { path: 'login.html' },
    { path: 'profile_user.html' , role: ["admin","user"] },
    { path: 'register.html' },
    { path: 'list_train.html',role: ["user"] },
    { path: 'booking.html',role: ["user"] },
    { path: 'booking_list.html',role: ["user"] },
    { path: 'ordernow.html',role: ["user"] }
];
// =====

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
// ======
function checkAccess(pageName, role) {
    let allowed = false;
    for (let route of routes) {
        
        if (route.path == pageName) {
            
            if (!route.role) {
                allowed = true;
                break;
            }
            else if (route.role.includes(role)) {
                allowed = true
                break;
            }
        }
    }
    return allowed;
}

(function() {
    console.log("Routes initializing")
    let user = JSON.parse(localStorage.getItem("Logged_in_users"));
    let role = user != null ? user.role : null;
    let pathName = window.location.pathname.substr(1);
    let allowedAccess = checkAccess(pathName, role);

   

    if (!allowedAccess) {
        alert("You are not authorized to access this page. Redirecting to login page");
        window.location.href = "login.html";
    }
})();