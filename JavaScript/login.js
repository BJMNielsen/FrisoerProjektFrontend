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
    const emailPasswordUrl = userEmail + "/" + userPassword

    console.log(userEmail)

    getLocalEntity("login", emailPasswordUrl).then(userProfile => {
        setUserProfileCookie(userProfile)
    if(userProfile.id === 1){
        window.location.href = 'adminPage.html'
    }else
        window.location.href = 'userProfilePage.html'
    }).catch(error => {alert(error.message)})
    /*
    try{const promise = await fetch(urlPostUserProfile + "/" + userEmail + "/" + userPassword)
        if(!promise.ok){
            throw new Error('Login Failed.');
        } else if(promise.ok){
            const response = await promise
            const user = await response.json()
            console.log(user.phoneNumber);
            console.log(user.id);
            sessionStorage.setItem("userId",JSON.stringify(user.id)); // Store the userId in sessionStorage
            userId = user.id;
            window.location.href = 'userProfilePage.html';
        }
    }
        catch (error) {
            console.error('Error:', error);
            alert("Login not valid.")
        }
    console.log(userId);
    console.log(userId = sessionStorage.getItem("userId")) // Retrieve the userId from sessionStorage
     */

}

function setUserProfileCookie(userProfile) {
    userId = sessionStorage.setItem("userId", JSON.stringify(userProfile.id))
    email = sessionStorage.setItem("email", JSON.stringify(userProfile.email))
    name = sessionStorage.setItem("name", JSON.stringify(userProfile.name))
    phoneNumber = sessionStorage.setItem("phoneNumber", JSON.stringify(userProfile.phoneNumber))
    password =  sessionStorage.setItem("password", JSON.stringify(userProfile.password))
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

