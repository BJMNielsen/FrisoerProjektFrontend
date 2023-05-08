///// Vi starter med koden til at 'post'
const urlPostTimeSlot = 'http://localhost:8080/timeslot'
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formTimeSlot;

function createFormEventListener(){
    formTimeSlot = document.getElementById("timeslot-form");
    formTimeSlot.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    postLocalForm("timeslot", formTimeSlot).then(timeslot => {
        console.log(timeslot)
        actionFetchTimeSlot();
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

/// fill table with timeslots
/// Vi går her videre til 'Get'


const urlGetTimeSlotes = 'http://localhost:8080/timeslots'
const tableTimeSlots = document.getElementById('timeslot-list')

function createTimeSlotTable(timeslot) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${timeslot.id}</td>
      <td>${timeslot.startTime}</td>
      <td>${timeslot.endTime}</td>
    `;

    cell = row.insertCell(3)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        const prodid = timeslot.id
        printTimeSlots(prodid, timeslot)
    })
    cell.appendChild(pbUpdate)
    tableTimeSlots.appendChild(row);
}

let lstTimeSlots = []
function actionFetchTimeSlot() {
    getLocalEntities("timeslots").then(timeslots => {
        tableTimeSlots.innerHTML = ''
        timeslots.forEach(timeslot => {
            createTimeSlotTable(timeslot)
        })
    }).catch(error => {

    })
    //  lstUserProfiles = await fetchAny(urlGetUserProfiles);
    //  tableUserProfiles.innerHTML = '';
    //  lstUserProfiles.forEach(createUserProfileTable)
}

function printTimeSlots(prodid, timeSlots) {
    console.log(prodid)
    console.log(timeSlots)
}
actionFetchTimeSlot()

