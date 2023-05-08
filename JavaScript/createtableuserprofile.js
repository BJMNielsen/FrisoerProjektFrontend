console.log("vi er i createtableuserprofile")

const pbCreateTable = document.getElementById("pbCreateTable")
const tblBooking = document.getElementById("tblBooking")

function createTable(booking) {
    console.log(booking.navn)
    if (!booking.kode) return;

    let cellCount = 0
    let rowCount = tblBooking.rows.length
    let row = tblBooking.insertRow(rowCount)
    row.id = booking.booking_id;

    let cell = row.insertCell(cellCount++)
    cell.innerHTML = booking.date

    cell = row.insertCell(cellCount++)
    cell.innerHTML = booking.time_slots.start_time



    //Delete knap, sender booking til DELETE
    cell = row.insertCell(cellCount++)
    let pbDelete = document.createElement("button")
    pbDelete.textContent = "Delete"
    pbDelete.className = "buttondelete"
    pbDelete.addEventListener('click', function () {
        const rowdel = document.getElementById(booking.booking_id)
        rowdel.remove();
        deleteBooking(booking)
    })
    cell.appendChild(pbDelete)

}

async function deleteBooking(booking) {
    console.log("slet booking" + booking.booking_id)
}

function actionCreateTable() {
    lstBookings.forEach(createTable)
}

pbCreateTable.addEventListener('click', actionCreateTable)

