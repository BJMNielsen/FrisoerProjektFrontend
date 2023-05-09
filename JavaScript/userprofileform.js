///// Vi starter med koden til at 'post'
const urlPostUserProfile = 'http://localhost:8080/userprofile'
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formUserProfile;

function createFormEventListener(){
    formUserProfile = document.getElementById("userprofile-form");
    formUserProfile.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    postLocalForm("userprofile", formUserProfile).then(userprofile => {
        console.log(userprofile)
        actionFetchUserProfiles();
    }).catch(error => {
        alert("We got an error: " + error.message)
    })
    /*
    const formData = new FormData(formUserProfile);
    console.log(formData);
    const jsonToPost = convertFormDataToJson(formData)
    console.log(jsonToPost)
    try {
        const responseData = await postFormDataAsJson(urlPostUserProfile, jsonToPost);
        console.log(responseData)
        //her kan man indsæt nyt userprofile i tabellen
        actionFetchUserProfiles()
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

     */
}

function convertFormDataToJson(formData) {
    // laver formData til JSON
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log(formDataJsonString);
    return formDataJsonString
}

async function postFormDataAsJson(url, jsonToSend) {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonToSend,
    };
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

/// fill table with userprofiles
/// Vi går her videre til 'Get'


const urlGetUserProfiles = 'http://localhost:8080/userprofiles'
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

let lstUserProfiles = []
function actionFetchUserProfiles() {
    getLocalEntities("userprofiles").then(userprofiles => {
        tableBookings.innerHTML = ''
        userprofiles.forEach(userprofile => {
            createUserProfileTable(userprofile)
        })
    }).catch(error => {

    })
  //  lstUserProfiles = await fetchAny(urlGetUserProfiles);
  //  tableUserProfiles.innerHTML = '';
  //  lstUserProfiles.forEach(createUserProfileTable)
}

function printUserProfiles(prodid, userProfiles) {
    console.log(prodid)
    console.log(userProfiles)
}
actionFetchUserProfiles()

