$(document).ready(() => {

    const $myEventList = $("#my-event-list");

    SDK.Event.attendingEvents((err, events) => {
        events = JSON.parse(events);
        events.forEach(event => {

            const eventHTML = `
            <tr>
                <td>${event.eventName}</td>
                <td>${event.owner}</td>
                <td>${event.location}</td>
                <td>${event.price}</td>
                <td>${event.eventDate}</td>
                <td>${event.description}</td>
                <td><a href="updateEvent.html?eventId=${event.idEvent}"><button class="btn btn-success update-event-button">Update</button></td>
                <td><button type="button" class="btn btn-success delete-event-button" data-event-id-delete="${event.idEvent}">Delete</button></td>
            </tr>
            `;

            $myEventList.append(eventHTML);
        });

        $(".delete-event-button").click(function () {
            const idEvent = $(this).data("event-id-delete");
            const event = events.find(event => event.idEvent === idEvent);

            SDK.Event.deleteEvent(idEvent, event.eventName, event.location, event.price, event.eventDate, event.description, (err, data) => {
                if (err && err.xhr.status === 401) {
                    $(".form-group").addClass("has-error")
                }
                else if (err) {
                    console.log("Something went wrong")
                    window.alert("Eventet kunne ikke slettes");
                } else {
                    window.location.href = "userEvent.html";
                }
            });
        });
    });
});







