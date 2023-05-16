///// Vi starter med koden til at 'post'
const urlPostUserProfile = 'http://localhost:8080/login'
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formLogin;

function createFormEventListener(){
    formLogin = document.getElementById("login-form");
    formLogin.addEventListener("submit", handleFormSubmit);

}




async function handleFormSubmit(event) {
    event.preventDefault();
    let adminName = document.getElementById("adminname").value;
    let adminPassword = document.getElementById("adminpassword").value;
    const emailPasswordUrl = adminName + "/" + adminPassword


    getLocalEntity("login/admin", emailPasswordUrl).then(adminProfile => {
        setAdminProfileCookie(adminProfile)
        window.location.href = 'adminPage.html'
    }).catch(error => {alert(error.message)})


}

function setAdminProfileCookie(adminProfile) {
    sessionStorage.setItem("adminname", JSON.stringify(adminProfile.name))
    sessionStorage.setItem("adminpassword", JSON.stringify(adminProfile.password))
}

function getUserProfileCookie() {

}

/// fill table with userprofiles
/// Vi går her videre til 'Get'


const tableBookings = document.getElementById('userprofile-list')

function createUserProfileTable(userProfile) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${userProfile.id}</td>
      <td>${userProfile.name}</td>
      <td>${userProfile.email}</td>
      <td>${userProfile.phoneNumber}</td>
      <td>${userProfile.password}</td>
    `;
    cell = row.insertCell(5)


    let pbUpdate = document.createElement("button")
    pbUpdate.textConetnt = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        const prodid = userProfile.id
        printUserProfiles(prodid, userProfile)
    })
    cell.appendChild(pbUpdate)
    tableBookings.appendChild(row);
}

function actionFetchUserProfiles() {
    getLocalEntities("userprofiles").then(userprofiles => {
        tableBookings.innerHTML = ''
        userprofiles.forEach(userprofile => {
            createUserProfileTable(userprofile)
        })
    }).catch(error => {

    })

}

function printUserProfiles(prodid, userProfiles) {
    console.log(prodid)
    console.log(userProfiles)
}
actionFetchUserProfiles()

