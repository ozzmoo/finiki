document.querySelector('.submit').onclick = () => {
  const id = document.querySelector('.sheetlink').value
  getStudents(id)
}

document.querySelector('.randomize').onclick = () => {
  computeStudents(students)
}



let students = []

function getStudents(id) {
  $.ajax({
    url: "https://webium.herokuapp.com/sheet",
    type: "POST",
    crossDomain: true,
    data: {
      'id': id
    },
    dataType: "json",
    success: function (response) {
      students = response;
      showStudents(students)
    },
    error: function (xhr, status) {
      console.log('web-sheets@webium-test.iam.gserviceaccount.com')
      document.querySelector('.students').innerHTML = `
      <div class="alert alert-danger" role="alert">
        Откройте доступ к таблице (<a href="https://telegra.ph/Kak-polzovatsya-finikami-10-11">см. инструкцию</a>)

        
      </div>
      `
      document.querySelector('.randomize').disabled = true
    }
  });
}

function showStudents(students) {
  const studentsTable = document.querySelector('.students')

  let studentsList = ''
  students.forEach((el, i) => {
    studentsList += `
    <tr>
      <th scope="row">${i+1}</th>
      <td>${el}</td>
    </tr>
    `
  });

  studentsTable.innerHTML = ''
  studentsTable.innerHTML += `
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Имя</th>
    </tr>
  </thead>
  <tbody>
    ${studentsList}
  </tbody>
</table>`
  document.querySelector('.randomize').disabled = false
}




function computeStudents(students) {
  const randomStudent = rando(0, students.length - 1)
  document.querySelector('.result').innerHTML = '';
  document.querySelector('.result').innerHTML += `
    <div class="alert alert-primary" role="alert">
      Номер победителя: ${randomStudent + 1 } - ${students[randomStudent]}
    </div>

   `
  console.log(`Номер победителя: ${randomStudent + 1 } - ${students[randomStudent]}`)
}