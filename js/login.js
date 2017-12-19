$(document).ready(() => {

    // Login metode

    $("#LoginBtn").click(() => {

        const email = $("#inputEmail").val();
        const password = $("#inputPassword").val();

        console.log("email: ", email, " +  password: ", password);
        SDK.User.login(email, password, (err, data) => {
            if (err) {
                console.log("fejl1");
            }
            SDK.User.loadCurrentUser((err, data) => {
                if (err) {
                    console.log("fejl2");
                } else {
                    console.log("Succes");
                    window.location.href = "user.html";
                }
            });
        });

    });
});