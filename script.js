function calculateAge(birthDate) {
    const currentDate = new Date();
    const dateOfBirth = new Date(birthDate);
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const month = currentDate.getMonth() - dateOfBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        age--;
    }

    return age;
}

function updateAge() {
    const age = calculateAge('1995-04-09'); // Coloca aquí la fecha de nacimiento
    document.getElementById('currentAge').innerText = age + ' years';
}