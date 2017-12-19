$(document).ready(() => {


    $("#createEventBtn").click(() => {


        const eventName = $("#createEventName").val();
        const location = $("#createEventLocation").val();
        const price = $("#createEventPrice").val();
        const eventDate = $("#createEventDate").val();
        const description = $("#createEventDescription").val();

        if (!eventName || !location || !price || !eventDate || !description) {
            alert("Noget mangler, prøv igen")
        } else {
            SDK.Event.createEvent(eventName, location, price, eventDate, description, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".form-group").addClass("Client fail");
                }
                else if (err) {
                    console.log("error happened")
                } else {
                    window.alert("Begivenheden er nu oprettet");
                    window.location.href = "events.html"
                }
            });

        }
    })
})