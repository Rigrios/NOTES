const createButton = document.querySelector('.create-notes')
const list = document.querySelector('.list__menu')
const input = document.querySelector('.input')
const notes = document.querySelectorAll('.notes')

let notesArray = []
if (localStorage.getItem('notesArray')) {
    notesArray = JSON.parse(localStorage.getItem('notesArray'))
    notesArray.forEach(el => {
        const notesHtml = `<div class="notes" id="${el.id}">
        <div class="notes__text">${el.text}</div>
                 <div class="notes__menu">
                <span class="menu__add"><img src="img/edit.png" data-btn="add"></span>
                   <span class="menu__delete"><img src="img/delete.png" data-btn="delete"></span>
        </div>
    </div>`
    list.insertAdjacentHTML('beforeend', notesHtml)
    })
}

createButton.addEventListener('click', createHtml)


list.addEventListener('click', function (e) {
    let del
    
    if (e.target.dataset.btn !== 'delete') {
        return
    } else {
        del = e.target.closest('.notes').id
    }
    index = notesArray.findIndex(el => {
        if (el.id == +del) {
            return true
        }
    })

    notesArray.splice(index, 1)
    arrayNotes()
    locolSave()
    
    

})

list.addEventListener('click', function(e) {
    if (e.target.dataset.btn === 'add') {
       let index = e.target.closest('.notes').id
       input.value = e.target.closest('.notes').textContent.trim()
       input.setAttribute('id', index)
       e.target.closest('.notes').classList.add('editV')

       
    }
})

input.addEventListener('input', function(e) {
   let index = notesArray.findIndex(el => {
            if (el.id === +input.id) {
                return true
            }
    })
    notesArray[index].text = input.value
    arrayNotes()
    locolSave()
    
    
    
    
})

function createHtml(e) {
    let notes = {
        id: Date.now(),
        text: 'Создайте заметку...'
    }
    
    const notesHtml = `<div class="notes" id="${notes.id}">
                            <div class="notes__text">${notes.text}</div>
                                     <div class="notes__menu">
                                    <span class="menu__add"><img src="img/edit.png" data-btn="add"></span>
                                       <span class="menu__delete"><img src="img/delete.png" data-btn="delete"></span>
                            </div>
                     </div>`
    list.insertAdjacentHTML('beforeend', notesHtml)
    notesArray.push(notes)
    locolSave()
}

function arrayNotes() {
    list.innerHTML = '';
    notesArray.forEach(el => {
        const notesHtml = `<div class="notes" id="${el.id}">
        <div class="notes__text">${el.text}</div>
                 <div class="notes__menu">
                <span class="menu__add"><img src="img/edit.png" data-btn="add"></span>
                   <span class="menu__delete"><img src="img/delete.png" data-btn="delete"></span>
        </div>
 </div>`
list.insertAdjacentHTML('beforeend', notesHtml)
    })
    
}


function locolSave() {
    localStorage.setItem('notesArray', JSON.stringify(notesArray))
}