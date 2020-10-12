document.querySelector('.submit').onclick = () => {
  const id = document.querySelector('.sheetlink').value
  getStudents(id)
}

document.querySelector('.randomize').onclick = () => {
  computeStudents(students)
}

document.querySelector('.add').onclick = () => {
  const studentsDiv = document.querySelector('.students')
  const id = document.querySelector('.sheetlink').value
  if (id == '' || id == undefined) {
    studentsDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Введите ID таблицы
      </div>
      `
  } else {

    studentsDiv.innerHTML = `
      <div class="add-form input-group input-group-sm">
        
        <input type="text" class="student-name form-control" placeholder="Имя">
        <input type="text" class="student-count form-control" placeholder="Кол-во фиников">
        <div class="input-group-append">
          <button class="submit-add btn btn-outline-secondary btn-primary btn-sm" type="button">Добавить</button>
        </div>
      </div>
    `
  }

  document.querySelector('.submit-add').addEventListener('click', () => {
    let data = {
      name: '',
      count: null
    }
    data['name'] = document.querySelector('.student-name').value
    data['count'] = parseInt(document.querySelector('.student-count').value)
    if (data.name == '' || isNaN(data.count)) {
      studentsDiv.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Заполните все поля
      </div>
      `
    } else {
      console.log(data)
      document.querySelector('.submit-add').onclick = addFiniks(data, id)
    }

  })

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

function addFiniks(data, id) {
  $.ajax({
    url: "https://webium.herokuapp.com/add",
    type: "POST",
    crossDomain: true,
    data: {
      'data': {
        name: data.name,
        count: data.count
      },
      'id': id
    },
    dataType: "json",
    success: function (response) {
      students = response;
      showStudents(students)
    },
    error: function (xhr, status) {
      document.querySelector('.students').innerHTML = `
      <div class="alert alert-danger" role="alert">
        Откройте доступ к таблице (<a href="https://telegra.ph/Kak-polzovatsya-finikami-10-11">см. инструкцию</a>)
      </div>
      `
      document.querySelector('.randomize').disabled = true
    }
  });
}