
let userProfile;

function checkIfUserIsLoggedIn(){
    const userid = sessionStorage.getItem("userId")
    console.log(userid)
    if(userid == null){
        console.log("Bruger ID er null, dvs ingen er logget ind.")
        window.location.href = 'loginPage.html'
        return;
    }
    let response = fetchAny(`userprofile/${userid}`, "GET", null)
    response
        .then(fetchedUserProfile => {userProfile = fetchedUserProfile})
        .catch(error => {
            // Dette kode er for når man sletter sin bruger, men du har stadig brugeren gemt i sin sessionStorage
            sessionStorage.removeItem("userId")
            console.log("brugeren du er logget ind som eksistere ikke mere. " + "Error message: " + error.message);
            window.location.href = 'loginPage.html';
        })
}

checkIfUserIsLoggedIn()
