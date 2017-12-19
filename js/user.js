$(document).ready(() => {

    const userTable = $("#userTable");

    SDK.User.loadCurrentUser((err, data) => {
        if (err) throw err;
        const user = JSON.parse(data);

        const userHTML = `
        <tr> 
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
`;

        userTable.append(userHTML);

    });
});
