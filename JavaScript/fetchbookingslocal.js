createtableuserprofile.jsconsole.log("vi er i fetchbookingslocal fra egen database")
const urlBookings = "http://localhost:8080/profil"

function fetchAny(url) {
    console.log(url)
    return fetch(url).then((response) => response.json())
}
let lstBookings = []
async function actionFetchBookings() {
    lstBookings = await fetchAny(urlBookings);
}

const pbFetchBookings = document.getElementById("pbFetchBookings")
pbFetchBookings.addEventListener('click', actionFetchBookings)

