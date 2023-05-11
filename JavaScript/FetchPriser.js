console.log("Jeg er inde i Fetch Priser")
const tblTreatments = document.querySelector("#tblTreatments")

//dette er ligesom en lambda - en anonymous function
function intetNavnHar(treatments) {

}

function createRowsForTreatmentTable(treatment){
    const row = document.createElement("tr")
    row.innerHTML= `
    <td>${treatment.name}</td>
    <td>${treatment.price}</td>
    
    `;
    tblTreatments.appendChild(row)
}

function fetchTreatments(){
    tblTreatments.innerHTML = ''
    getLocalEntities("treatments").then(treatments => {
        // de skal ind i vores tabel
        treatments.forEach(treatment => {
            createRowsForTreatmentTable(treatment)
        })
    }).catch(error =>{
        alert("there was an error retrieving the treatmentsData, Error: " + error.message)
    })
}

fetchTreatments()