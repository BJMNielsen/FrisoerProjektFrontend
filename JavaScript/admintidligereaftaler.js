const tableKundeliste = document.querySelector("#tblTidligereAftaler");

function fillTableTidligereTider() {
    // Vi skaffer en liste af tidligere tider
    getLocalEntities("bookings/past").then(bookings => {
        bookings.forEach(booking => fillRowTableWithTidligereBookings(booking))
    })
}

async function fillRowTableWithTidligereBookings(booking) {
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
    <td>${booking.bookingUserProfile.name}</td>
    <td>${booking.date}</td>
    <td>${booking.timeSlot.startTime.slice(0, 5)}</td>
    <td>${booking.timeSlot.endTime.slice(0, 5)}</td>
    <td>${booking.fullPrice}</td>
  `;

    tableKundeliste.appendChild(tableRow);
}

fillTableTidligereTider()