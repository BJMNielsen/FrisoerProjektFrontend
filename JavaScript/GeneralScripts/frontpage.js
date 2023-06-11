
function preparePillButtons() {
    document.querySelector(".BookTidPille button").addEventListener("click", bringUserToBookingPage)
    document.querySelector(".sePriserPill button").addEventListener("click", bringUserToPricePage)
}

function bringUserToBookingPage() {
    window.location.href = "../../HTML/ProfilePages/calender.html"
}

function bringUserToPricePage() {
    window.location.href = "Priser.html"
}

preparePillButtons()