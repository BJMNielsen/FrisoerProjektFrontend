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
    try{const promise = await fetch(urlPostUserProfile + "/" + userEmail + "/" + userPassword)
        if(!promise.ok){
            throw new Error('Login Failed.');
        } else if(promise.ok){
            const response = await promise
            const user = await response.json()
            console.log(user.phoneNumber);
            console.log(user.id);
            userId = user.id;
            alert("Login Successful.");
        }
    }
        catch (error) {
            console.error('Error:', error);
            alert("Login not valid.")
        }
    console.log(userId);
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

