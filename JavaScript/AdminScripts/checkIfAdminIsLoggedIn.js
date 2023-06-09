
let adminProfile;

function checkIfAdminIsLoggedIn(){
    let adminName = sessionStorage.getItem("adminName")
    let adminPassword = sessionStorage.getItem("adminPassword")
    console.log("The adminName: " + adminName + " - The adminPassword: " + adminPassword)
    if(adminName === null || adminPassword === null){
        console.log("Der er ikke noget admin login gemt i cookies/sessionStorage.")
        alert("Det er ikke tilladt at være på denne side uden at være logget ind som en admin")
        window.location.href = 'adminlogin.html'
        return;
    }
    adminName = adminName.replace(/^"(.*)"$/, "$1")
    adminPassword = adminPassword.replace(/^"(.*)"$/, "$1")
    const adminLoginUrl = adminName + "/" + adminPassword
    getLocalEntity("login/admin", adminLoginUrl)
        .then(admin => {
            console.log(adminName + " " + adminPassword)
            adminProfile = admin})
        .catch(error => {
            sessionStorage.removeItem("adminName")
            sessionStorage.removeItem("adminPassword")
            console.log("Admin du er logget ind som eksistere ikke mere. " + "Error message: " + error.message);
            alert("Noget gik galt og den admin profil der var logget ind på var ikke til at finde. Error: " + error.message)
            window.location.href = 'adminlogin.html';
        })

}

checkIfAdminIsLoggedIn()