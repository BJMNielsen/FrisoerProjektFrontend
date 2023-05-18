console.log("Jeg er inde i admin fetch")
const tblUserProfiles = document.querySelector("#tblUserProfiles")
const bookingsTable = document.querySelector("#tblUserProfiles");







//test
function createRowsForBookingTable(booking) {
    const row = document.createElement("tr");
    const treatmentNames = [];
    booking.treatments.forEach((treatment) => {
        treatmentNames.push(treatment.name);
    });
    row.innerHTML = `
    <td>${booking.bookingUserProfile.name}</td>
    <td>${booking.date}</td>
    <td>${booking.timeSlot.startTime.slice(0, 5)}</td>
    <td>${booking.timeSlot.endTime.slice(0, 5)}</td>
    <td>${booking.fullPrice}</td>
    <td><button class="btn btn-dark" id="${booking.id}-delete" onclick=deleteAlertMessage()>Delete</button></td>
  `;
    bookingsTable.appendChild(row);
}

function deleteAlertMessage(){
    alert("You have succesfully deleted the booking")
}


function fetchBookings(){
    tblUserProfiles.innerHTML = ''
    getLocalEntities("bookings/future").then(bookings => {
        // de skal ind i vores tabel
        bookings.forEach(booking => {
            createRowsForBookingTable(booking)
        })
    }).catch(error =>{
        alert("there was an error retrieving the user profiles, Error: " + error.message)
    })
}
fetchBookings()
