document.addEventListener('DOMContentLoaded', createFormEventListener);
let formLogin;

function createFormEventListener() {
    formLogin = document.getElementById("login-form");
    formLogin.addEventListener("submit", handleFormSubmit);

}

function checkIfAdminIsAlreadyLoggedIn() {
    let adminName = sessionStorage.getItem("adminName")
    let adminPassword = sessionStorage.getItem("adminPassword")
    console.log("The adminName: " + adminName + " - The adminPassword: " + adminPassword)
    if (adminName !== null || adminPassword !== null) {

        const adminLoginUrl = adminName + "/" + adminPassword
        getLocalEntity("login/admin", adminLoginUrl)
            .then(admin => {
                alert("Du er allerede logget ind som Admin: " + admin.name)
                window.location.href = 'adminminetider.html';
            })
            .catch(error => {
                sessionStorage.removeItem("adminName")
                sessionStorage.removeItem("adminPassword")
                console.log("Admin du er logget ind som eksistere ikke mere. " + "Error message: " + error.message);
                alert("Noget gik galt og den admin profil der var logget ind på var ikke til at finde. Error: " + error.message)
            })
    }
}

checkIfAdminIsAlreadyLoggedIn()


async function handleFormSubmit(event) {
    event.preventDefault();
    let adminName = document.getElementById("adminname").value;
    let adminPassword = document.getElementById("adminpassword").value;
    console.log("adminNAme: " + adminName + " - adminPassword: " + adminPassword)
    const emailPasswordUrl = adminName + "/" + adminPassword


    getLocalEntity("login/admin", emailPasswordUrl).then(adminProfile => {
        setAdminProfileCookie(adminProfile)
        alert("Det lykkes at logge ind som Admin: " + adminName)
        window.location.href = 'adminminetider.html'
    }).catch(error => {
        alert(error.message)
    })


}

function setAdminProfileCookie(adminProfile) {
    sessionStorage.setItem("adminName", adminProfile.name)
    sessionStorage.setItem("adminPassword", adminProfile.password)
    console.log("setAdminProfileCookie: " + "adminName: " + sessionStorage.getItem("adminName"))
}

