const url = "http://localhost:8080";

const dateElement2 = document.getElementById("dato-felt")

async function fetchAny(url) {
    console.log(url);
    return await fetch(url).then((response) => response.json());
}

async function getAllAvailableTimes() {
    const date = dateElement2.value;
    console.log(date)
    const availableTimes = await fetchAny(url + `/timeslots/available/${date}`);
    console.log(availableTimes);
    // Vi kalder metoden der indsætter cyclister i vores tabel i HTML'en
    showAllTimeSlots(availableTimes);
}

function showAllTimeSlots(data) {
    // map er en function, der gør at man kan manipulere en liste, manipulere den og giver dig en ny liste.
    const tableRowArray = data.map(timeslot => `
    <tr>
        <td>${timeslot.startTime}</td>
        <td>${timeslot.endTime}</td>
    </tr>
    `)
    // Vi laver en knap, med et unikt id, vi sætter til at være det samme som cyclistens id + "-deleteCyclist", dvs "1-deleteCyclist" fx.

    console.log(tableRowArray)
    // Vi fjerne lige kommaerne bag hver af værdierne der er i vores json. Fx bag navn står der "Børge, "
    // ser sådan her ud i console log: '\n    <tr>\n        <td>1</td>\n        <td>24</td>\n …
    // join metoden laver et array om til en string, som vi så injecter ind i vores table med innerHTML.

    const tableRowsStringUdenKomma = tableRowArray.join("\n");
    console.log(tableRowsStringUdenKomma)
    /*
    efter vi har lavet den til en String:
    <tr>
        <td>1</td>
        <td>24</td>
        <td>Lars</td>
        <td>3544</td>
        <td>12</td>
        <td>32</td>
        <td>Team Easy On</td>
    </tr>
    */

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


document.querySelector("#datoKnap").addEventListener("click", getAllAvailableTimes)
hideTableIfNoRows()



