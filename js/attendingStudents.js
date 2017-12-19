$(document).ready(() => {

    const $AttendingStudentsList = $("#attending-students-list");

    SDK.Event.attendingStudents((err, students) => {
        students = JSON.parse(students);
        students.forEach(student => {

            const studentHTML = `
            <tr>
                <td>${student.idStudent}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
            </tr>
            `;

            $AttendingStudentsList.append(studentHTML);
        });
    });

});