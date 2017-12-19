$(document).ready(() => {


    // Metode til opret bruger

    $("#createUserBtn").click(() => {

        const firstName = $("#createFirstName").val();
        const lastName = $("#createLastName").val();
        const email = $("#createEmail").val();
        const password = $("#createPassword").val();
        const verifyPassword = $("#createVerifyPassword").val();

        if (!firstName || !lastName || !email || !password || !verifyPassword) {
            alert("Der mangler noget")

        } else {
            if (password.valueOf() === verifyPassword.valueOf()) {
                SDK.User.createUser(firstName, lastName, email, password, verifyPassword, (err, data) => {
                    if (err && err.xhr.status === 400) {
                        console.log("A problem");
                        $(".form-group").addClass("En klient fejl");
                    } else if (err) {
                        console.log("der skete en fejl");
                    } else {
                        window.alert("Du er nu oprettet");
                        window.location.href = "login.html";

                    }
                });

            } else {
                alert("Dine passwords matcher ikke")
            }
        }

    });

});