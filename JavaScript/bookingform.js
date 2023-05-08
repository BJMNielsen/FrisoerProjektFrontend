///// Vi starter med koden til at 'post'
const urlPostUserProfile = 'http://localhost:8080/booking'
document.addEventListener('DOMContentLoaded', createFormEventListener);
let formBooking;

function createFormEventListener(){
    formBooking = document.getElementById("booking-form");
    formBooking.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
    //Vi handler submitten her i stedet for default html behaviour
    event.preventDefault();
    postLocalForm("booking", formBooking).then(booking => {
        console.log(booking)
        actionFetchBookings();
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


const urlGetBookings = 'http://localhost:8080/bookings'
const tableBookings = document.getElementById('booking-list')

function createBookingTable(booking) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.id}</td>    
    `;

    cell = row.insertCell(5)
    let pbUpdate = document.createElement("button")
    pbUpdate.textContent = "Opdater"
    pbUpdate.className = "buttonupdate"
    pbUpdate.addEventListener('click', function () {
        const prodid = booking.id
        printTimeSlots(prodid, booking)
    })
    cell.appendChild(pbUpdate)
    tableBookings.appendChild(row);
}

let lstBookings = []
function actionFetchBookings() {
    getLocalEntities("bookings").then(bookings => {
        tableBookings.innerHTML = ''
        bookings.forEach(booking => {
            createBookingTable(booking)
        })
    }).catch(error => {

    })

}

function printBookings(prodid, bookings) {
    console.log(prodid)
    console.log(bookings)
}
actionFetchBookings()

