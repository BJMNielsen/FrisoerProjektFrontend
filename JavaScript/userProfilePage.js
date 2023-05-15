console.log("jeg er i userprofilePage javascript")

const bookingsTable = document.querySelector("#tblBooking")




const fetchName = document.querySelector("#name")
const fetchEmail = document.querySelector("#email")
const fetchPhoneNumber = document.querySelector("#phoneNumber")

function updateUserprofileInformation(){
   document.querySelector("#PersonName").innerHTML = name;
   document.querySelector("#Email").innerHTML = email;
   document.querySelector("#phoneNumber").innerHTML = phoneNumber;

}


function run(){

    userId = JSON.parse(sessionStorage.getItem("userId")) // Retrieve the userId from sessionStorage
    name = JSON.parse(sessionStorage.getItem("name")) // Retrieve the userId from sessionStorage
    email = JSON.parse(sessionStorage.getItem("email")) // Retrieve the userId from sessionStorage
    phoneNumber = JSON.parse(sessionStorage.getItem("phoneNumber")) // Retrieve the userId from sessionStorage
    password = JSON.parse(sessionStorage.getItem("password")) // Retrieve the userId from sessionStorage
    console.log("hello?")
    console.log(userId)
    updateUserprofileInformation()

}
run()

function createRowsForBookingTable(booking){
    const row = document.createElement("tr");
    const treatmentNames = [];
    let totalPrice = 0;
    booking.treatments.forEach(treatment => {
        treatmentNames.push(treatment.name);
        totalPrice += treatment.price;
    });
    row.innerHTML = `
    <td>${booking.date}</td>
    <td>${booking.timeSlot.startTime}</td>
    <td>${booking.timeSlot.endTime}</td>
    <td>${treatmentNames.join(", ")}</td>
    <td>${totalPrice}</td>
  `;
    bookingsTable.appendChild(row);
}





console.log(userId)
fetchAny("bookings/userid/" + userId,"GET",null).then(userBookings=>{
    userBookings.forEach(userBooking=>{
        createRowsForBookingTable(userBooking)
    })
}).catch(error => {
    alert(error.message)
})


