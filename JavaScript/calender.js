const dateInput = document.querySelector("#dato-felt")
dateInput.addEventListener("change", pickDate)

const treatmentsElement = document.querySelector("#treatments-to-pick")
const tblOfAvailableTimes = document.querySelector("#tableOfAvailableTimes")
const tblBodyOfAvailableTimes = document.querySelector("#tableBodyOfAvailableTimes")
hideTableIfNoRows()

const buttonSendBooking = document.querySelector("#button-send-booking")
buttonSendBooking.addEventListener("click", sendBooking)

function setMinDateToPick() {
    const today = new Date();
    const daysAwayFromToday = 1
    today.setDate(today.getDate() + daysAwayFromToday) // Add how many days to today's date
    const minimumDate = today.toISOString().split("T")[0] // Format tomorrow's date as "YYYY-MM-DD" and not "YYYY-MM-DDTHH:mm:ss.sssZ"
    dateInput.setAttribute("min", minimumDate)
}
setMinDateToPick()

const booking = {
    date: null,
    timeSlot: null
}

const treatments = {
    vask: null,
    klip: null
}

function pickDate() {
    resetBooking()
    resetTreatments()

    const pickedDate = dateInput.value
    if (pickedDate === "") {
        console.log("No date is picked")

    } else {
        console.log("The picked date is: " + pickedDate)
        booking.date = pickedDate
        console.log(booking.date)
        fetchTreatments()
        createTableOfAvailableTimeSlots(pickedDate)
    }
}

function createTableOfAvailableTimeSlots(date) {
    fetchAny(`timeslots/available/${date}`).then(timeSlots => {
        if (timeSlots.length <= 0) {
            alert("There are no available Times for the Date: " + date)
        } else {
            insertTimeSlotsIntoTable(timeSlots)
            console.log(tblBodyOfAvailableTimes)
        }
        hideTableIfNoRows()
    })
}

function resetBooking() {
    booking.date = null
    resetTimeSlots()
}

function resetTreatments() {
    treatments.vask = null
    treatments.klip = null
    treatmentsElement.innerHTML = ""
}

function resetTimeSlots() {
    booking.timeSlot = null
    tblBodyOfAvailableTimes.innerHTML = ""
    hideTableIfNoRows()
}

function hideTableIfNoRows() {
    const rowInTable = tblOfAvailableTimes.rows.length
    if (rowInTable === 1) {
        tblOfAvailableTimes.style.visibility = "hidden";
    } else {
        tblOfAvailableTimes.style.visibility = "visible"
    }
}

function insertTimeSlotsIntoTable(timeSlots) {
    const tableRowsArray = timeSlots.map(timeSlot => `
    <tr id="timeSlotRow${timeSlot.id}" onclick="setTheTimeslotValue(${timeSlot.id})">
        <td>${timeSlot.startTime.slice(0, 5)}</td>
        <td>${timeSlot.endTime.slice(0, 5)}</td>
    </tr>
    `)
    // join metoden fjerner alt mellem 2 strings og joiner dem.
    tblBodyOfAvailableTimes.innerHTML = tableRowsArray.join("\n");
}




function setTheTimeslotValue(timeSlotId) {
    console.log("TimeSlot ID:", timeSlotId)
    const checkedTimeSlotRowElement = document.querySelector(".checked-timeslot-row")
    if (checkedTimeSlotRowElement !== null) {
        checkedTimeSlotRowElement.classList.remove("checked-timeslot-row")
        booking.timeSlot = null
    }
    getLocalEntity("timeslot", timeSlotId).then(timeSlot => {
        booking.timeSlot = timeSlot
        const timeslotRowElement = document.querySelector(`#timeSlotRow${timeSlotId}`)
        timeslotRowElement.classList.add("checked-timeslot-row")
    }).catch(error => {
        console.log("It was a failure to get the picked timeslot with the ID: " + timeSlotId + " to be put in the booking")
        console.log("Because there was an Error:", error.message)
    })
}


function sendBooking() {

    if (booking.date === null || booking.date === "") {
        alert("Vælg en dato til din booking!")
        return;
    }
    if (booking.timeSlot === null) {
        alert("Vælg en tid til din booking!")
        return;
    }
    const pickedTreatments = getTreatments()
    if (pickedTreatments.length <= 0) {
        alert("Vælg mindst en behandling for en klipning!")
        return;
    }
    const bookingTreatmentDTO = createBookingTreatmentDTO(booking, pickedTreatments, userProfile)

    fetchAny("booking", "POST", bookingTreatmentDTO).then(booking => {
        let treatmentDescriptions = ""
        booking.treatments.forEach(treatment => {
            treatmentDescriptions += `\n${treatment.name} Pris: ${treatment.price} kr.`
        })
        alert(`Tillykke ${userProfile.name} det lykkes at lave en booking!
                \nDato: ${booking.date}
                \nStart Tid: ${booking.timeSlot.startTime.slice(0, 5)}
                \nSlut Tid: ${booking.timeSlot.endTime.slice(0, 5)}
                ${treatmentDescriptions}
                \nFuld Pris: ${booking.fullPrice} kr.
                `)
        window.location.href = 'userProfilePage.html'
    }).catch(error => {
        console.log("There was an Error:", error)
        alert("We encountered the Error: " + error.message)
    })
    // når en booking er blevet sendt, successful eller ikke, så refreshes html siden igen, så input felter er forfra
    window.location.href = 'calender.html'
}

function createBookingTreatmentDTO(booking, listOfTreatments, userProfile) {
    return {
        booking: booking,
        listOfTreatments: listOfTreatments,
        userProfile: userProfile
    }
}

function getTreatments() {
    const treatmentList = []
    if (treatments.klip !== null) {
        treatmentList.push(treatments.klip)
        if (treatments.vask !== null) {
            treatmentList.push(treatments.vask)
        }
    }
    return treatmentList
}



function fetchTreatments() {
    getLocalEntities("treatments").then(treatments => {
        treatments.forEach(treatment => {
            createTreatmentCheckBox(treatment)
        })
    })
}


function createTreatmentCheckBox(treatment) {
    const treatmentLabel = document.createElement("label");
    const treatmentInput = document.createElement("input");
    const treatmentText = document.createTextNode(`Treatment name: ${treatment.name} - Price: ${treatment.price} kr.`);
    const breakLineElement = document.createElement("br");

    treatmentLabel.style.display = "flex";
    treatmentLabel.style.alignItems = "center";

    treatmentInput.value = treatment.id;
    treatmentInput.treatment = treatment;

    if (treatment.name === "Hårvask") {
        prepareWashTreatmentInput(treatmentInput)
    } else {
        prepareCutTreatmentInput(treatmentInput)
    }

    treatmentLabel.appendChild(treatmentInput);
    treatmentLabel.appendChild(treatmentText);

    treatmentsElement.appendChild(treatmentLabel);
    treatmentsElement.appendChild(breakLineElement)

}

function prepareWashTreatmentInput(treatmentInput) {
    treatmentInput.type = "checkbox";
    treatmentInput.name = "wash-treatment"
    treatmentInput.addEventListener("change", () => {
        if (treatmentInput.classList.contains("checked")){
            treatmentInput.classList.remove("checked")
            treatments.vask = null
        } else {
            treatmentInput.classList.add("checked")
            treatments.vask = treatmentInput.treatment
        }
    })
}

function prepareCutTreatmentInput(treatmentInput) {
    treatmentInput.type = "radio";
    treatmentInput.name = "treatment"
    treatmentInput.addEventListener("change", () => {
        treatments.klip = treatmentInput.treatment
    })
}
