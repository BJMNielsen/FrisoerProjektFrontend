const url = "http://localhost:8080";

const dateElement = document.getElementById("dato-felt")

const booking = {
    date: null,
    timeSlot: null
}

const treatments = {
    vask: null,
    klip: null
}

async function fetchAny(url) {
    console.log(url);
    return await fetch(url).then((response) => response.json());
}

async function showAllAvailableTimeSlotsInTable() {
    const date = dateElement.value;
    booking.date = dateElement.value;
    const availableTimes = await fetchAny(url + `/timeslots/available/${date}`);
    // Vi kalder metoden der indsætter tiderne i vores tabel i HTML'en
    booking.timeSlot = null; // resetter den hvis vi vælger en ny

    createTableOfTimeSlots(availableTimes);
}

async function clickedTimeSlot(event){
    const timeSlotRow = event.target;
    document.querySelector("#").setAttribute("data-id", postObject.id);
    const id = form.getAttribute("data-id");
    console.log(id);
    await deletePost(id);
}

function createTableOfTimeSlots(data) {
    // map er en function, der gør at man kan manipulere en liste, manipulere den og giver dig en ny liste.
    const tableRowArray = data.map(timeslot => `
    <tr>
        <td>${timeslot.startTime}</td>
        <td>${timeslot.endTime}</td>
    </tr>
    `)
    // Fjerner kommaer fra listen så vi kun får værdierne.
    const tableRowsStringUdenKomma = tableRowArray.join("\n");
    console.log(tableRowsStringUdenKomma)

    // join metoden fjerner alt mellem 2 strings og joiner dem.
    document.querySelector("#tableBodyOfAvailableTimes").innerHTML = tableRowsStringUdenKomma;

    const th = document.querySelector("#tableOfAvailableTimes")
    th.style.visibility = "visible";
}

function hideTableIfNoRows() {
    const rowInTable = document.querySelector("#tableOfAvailableTimes").rows.length
    if (rowInTable == 1) {
        const th = document.querySelector("#tableOfAvailableTimes")
        th.style.visibility = "hidden";
    }
    console.log("LALALA")
    /*if ($('#tableOfAvailableTimes > tbody > tr').length == 0) {
        $('#tableOfAvailableTimes > thead > th').css('display', 'none');
    }*/
}


document.querySelector("#dato-felt").addEventListener("change", showAllAvailableTimeSlotsInTable)

hideTableIfNoRows()



