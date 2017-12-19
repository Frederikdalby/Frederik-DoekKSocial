$(document).ready(() => {
    //Se hvilke begivenheder man deltager i
    const $attendingEventList = $("#attending-event-list")




    SDK.Event.attendingEvents((cb, events) =>{
        events = JSON.parse(events);
        events.forEach(event => {

            let eventHtml = `
            <tr>
                <td>${event.eventName}</td>
                <td>${event.owner}</td>
                <td>${event.location}</td>
                <td>${event.eventDate}</td>
                <td>${event.description}</td>
            </tr>
            `;

            $attendingEventList.append(eventHtml);
        });
    });
});