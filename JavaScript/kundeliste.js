const tableKundeliste = document.querySelector("#tblKundeliste");

function fillTableKundeListe() {
    // Vi skaffer en liste af userProfiles
    getLocalEntities("userprofiles").then(userProfiles => {
        userProfiles.forEach(userprofile => fillRowTableWithUserProfile(userprofile))
    })
}

async function fillRowTableWithUserProfile(userprofile) {
    console.log(userprofile)
    const tableRow = document.createElement("tr");

    tableRow.innerHTML = `
    <td>${userprofile.name}</td>
    <td>${userprofile.email}</td>
    <td>${userprofile.phoneNumber}</td>
  `;

    tableKundeliste.appendChild(tableRow);
}

fillTableKundeListe()