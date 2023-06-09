const logoutButton = document.querySelector("#logout-button")
logoutButton.querySelector("button").addEventListener("click", pushingLogoutButton)

function checkIfLoggedIn() {
    const userProfileId = sessionStorage.getItem("userId")
    console.log("Userprofile ID:", userProfileId)
    if (!userProfileId) {
        logoutButton.style.visibility = "hidden"
    } else {
        logoutButton.style.visibility = "visible"
    }
}

checkIfLoggedIn()



function pushingLogoutButton() {
    sessionStorage.removeItem("userId")
    window.location.href = 'loginPage.html'
}