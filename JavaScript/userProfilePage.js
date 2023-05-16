console.log("jeg er i userprofilePage javascript")

const bookingsTable = document.querySelector("#tblBooking")



function updateUserprofileInformation(){
   document.querySelector("#PersonName").innerHTML = name;
   document.querySelector("#Email").innerHTML = email;
   document.querySelector("#phoneNumber").innerHTML = phoneNumber;

   // document.querySelector("#tblBooking").addEventListener("click", deleteBookingButtonEvent);
    
}


function run(){

    userId = JSON.parse(sessionStorage.getItem("userId")) // Retrieve the userId from sessionStorage
    name = JSON.parse(sessionStorage.getItem("name")) // Retrieve the userId from sessionStorage
    email = JSON.parse(sessionStorage.getItem("email")) // Retrieve the userId from sessionStorage
    phoneNumber = JSON.parse(sessionStorage.getItem("phoneNumber")) // Retrieve the userId from sessionStorage
    password = JSON.parse(sessionStorage.getItem("password")) // Retrieve the userId from sessionStorage
    updateUserprofileInformation()
    const deleteButton = document.querySelector(".delete-button");
    deleteButton.addEventListener("click", deleteUser);
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
    <td><button class="btn btn-primary" id="${booking.id}-deleteBooking">Delete</button></td>

  `;
    bookingsTable.appendChild(row);
}

function deleteUser(){
    const userprofile = {id: userId}
    fetchAny("userprofile","DELETE",userprofile).then(userprofilex=>{
       alert("This email has been deleted: " + userprofilex.email)
    }).catch(error=>{alert("This email doesn't exit anymore.")});
}

console.log(userId)
fetchAny("bookings/userid/" + userId,"GET",null).then(userBookings=>{
    userBookings.forEach(userBooking=>{
        createRowsForBookingTable(userBooking)
    })
}).catch(error => {
    alert(error.message)
})

/*
async function deleteBookingButtonEvent(event) {
    // Vi sender en event, som er any "click" på hjemmesiden.
    // Target er det vi klikker på.
    const target = event.target;
    // Vores console.log af const target, bliver så den knap vi klikker på. <button class="btn btn-primary" id="1-deleteBooking">Delete</button>
    // Dvs target er vores delete knap, hvis vi trykker på den.
    console.log(target)
    if (!target.classList.contains("btn"))
        // Vi siger så at hvis target ikke indeholder "btn" i class tag, så gør vi ikke noget.
        return;
    else {
        // Ellers tager vi knappens id, finder "-deleteBooking" delen af id'et og sletter.
        // Vi har givet hver knap et id der hedder "id + -deleteBooking", hvor id er det samme id som hver bookningen har.
        // Dvs for at få fat i bookningens id som vi kan lave et fetch delete kald på til vores backend, så fjerner vi "-deleteBooking" fra knapnavnet.
        const id = target.id.replace("-deleteBooking", "");
        console.log(id);
        deleteBookingById(id);
        // Vi refresher vores tabel
        window.location.reload();
    }

    function deleteBookingById(bookingId) {
        // Vi laver et fetch kald, med vores id, og specifier metoden til at være DELETE
        fetchAny("bookings/bookingId/" + bookingId,"DELETE",null)
            // Her siger vi at responset vi får fra vores backend
            // (hvor vi jo har lavet et responseEntity der returner det vi sletter og statuskoden)
            // det printer vi. Vi håndtere ligesom svaret fra vores backend server.
            .then(response => {
                if (response.ok) {
                    // Vi laver vores response om til json.
                    // Vi tager så dataen i den json (.then(data => {...
                    // og console logger vores deleted booking og statuscoden, og returner det.
                    return response.json().then(data => {
                        console.log("Deleted booking:", data);
                        console.log("Status code:", response.status);
                    });
                } else {
                    throw new Error("HTTP status code: " + response.status);
                }
            })
            .catch(error => {
                console.log("An error occurred:", error);
            });

    }
}
*/
