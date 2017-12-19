$(document).ready(() => {

    $("#update-event-button").click(() => {

        const eventName = $("#updateEventName").val();
        const location = $("#updateLocation").val();
        const eventDate = $("#updateEventDate").val();
        const description = $("#updateDescription").val();
        const price = $("#updatePrice").val();

        SDK.Event.updateEvent(eventName, location, eventDate, description, price, idEvent, (err, data) => {
            if (err && err.xhr.status === 401) {
                $(".form-group").addClass("has-error")
            }
            else if (err) {
                console.log("noget gik galt")

            } else {
                window.alert("Eventet er nu opdateret");
                window.location.href = "userEvent.html";
            }
        }) ;

    });
});