const logoutButton = document.querySelector("#logout-button")
logoutButton.addEventListener("click", pushingLogoutButton)

function checkIfLoggedIn() {
    const adminName = sessionStorage.getItem("adminName")

    if (!adminName) {
        logoutButton.style.visibility = "hidden"
    } else {
        logoutButton.style.visibility = "visible"
    }
}

checkIfLoggedIn()

function pushingLogoutButton() {
    sessionStorage.removeItem("adminName")
    sessionStorage.removeItem("adminPassword")
    window.location.href = 'adminlogin.html'
}