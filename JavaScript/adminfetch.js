console.log("Jeg er inde i admin fetch")
const tblUserProfiles = document.querySelector("#tblUserProfiles")
const bookingsTable = document.querySelector("#tblUserProfiles");







//test
function createRowsForBookingTable(booking) {
    const row = document.createElement("tr");
    const treatmentNames = [];
    let totalPrice = 0;
    booking.treatments.forEach((treatment) => {
        treatmentNames.push(treatment.name);
        totalPrice += treatment.price;
    });
    row.innerHTML = `
    <td>${booking.bookingUserProfile.name}</td>
    <td>${booking.date}</td>
    <td>${booking.timeSlot.startTime}</td>
    <td>${booking.timeSlot.endTime}</td>
    <td>${totalPrice}</td>
  `;
    bookingsTable.appendChild(row);
}



function fetchBookings(){
    tblUserProfiles.innerHTML = ''
    getLocalEntities("bookings").then(bookings => {
        // de skal ind i vores tabel
        bookings.forEach(booking => {
            createRowsForBookingTable(booking)
        })
    }).catch(error =>{
        alert("there was an error retrieving the user profiles, Error: " + error.message)
    })
}
fetchBookings()
