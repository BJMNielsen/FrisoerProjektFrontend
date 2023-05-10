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
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;
    console.log(userEmail)
    const promise =  fetch(urlPostUserProfile + "/" + userEmail + "/" + userPassword)
    const response = await promise

    const user = await response.json()

    console.log(user.phoneNumber)

/*
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    postLocalForm("login", formLogin).then(userprofile => {
        console.log(userprofile)
        actionFetchUserProfiles();
    }).catch(error => {
        alert("We got an error: " + error.message)
    })
*/
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
    pbUpdate.textContent = "Opdater"
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

