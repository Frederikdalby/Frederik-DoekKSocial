$(document).ready(() =>{

    // Metode til at logge ud (fjerner token samt tilhørende oplysningeR)
    $("#LogoutBtn").click((e)=> {
        e.preventDefault();

        SDK.User.logout((err, data) => {
            if (err && err.xhr. status == 401) {
                console.log("fejl");

            } else {
                console.log(data);

                localStorage.removeItem("token");
                localStorage.removeItem("student");
                localStorage.removeItem("chosenEvent");
                window.location.href ="login.html";
            }
        });
    });
});