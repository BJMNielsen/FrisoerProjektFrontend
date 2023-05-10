console.log("Jeg er inde i admin fetch")
const tblUserProfiles = document.querySelector("#tblUserProfiles")


function createRowsForUserProfilesTable(userprofile, booking){
    const row = document.createElement("tr")
    row.innerHTML= `
    <td>${userprofile.name}</td>  
    <td>${userprofile}</td>
    <td>${userprofile}</td>
    <td>${userprofile}</td>
    <td>${userprofile.phoneNumber}</td>
    
    `;
    tblUserProfiles.appendChild(row)
}

function fetchUserProfiles(){
    tblUserProfiles.innerHTML = ''
    getLocalEntities("userprofiles").then(userProfiles => {
        // de skal ind i vores tabel
        userProfiles.forEach(user_profile => {
            createRowsForUserProfilesTable(user_profile)
        })
    }).catch(error =>{
        alert("there was an error retrieving the user profiles, Error: " + error.message)
    })
}

fetchUserProfiles()