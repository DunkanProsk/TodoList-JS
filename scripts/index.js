const input = document.querySelector('#input-field');
const list = document.querySelector('#list');
const butt = document.querySelector('#addBtn');
const clear = document.querySelector('#clearbtn');
const save = document.querySelector('#savebtn');

let todoList = [
    {
        name: 'buy milk',
        checked: true,
    },
    {
        name: 'buy eggs',
        checked: false,
    },
    {
        name: 'buy cat',
        checked: false,
    },
];

let render = () => {
    list.innerHTML = '';

    todoList.forEach((item, index) => {
        let li = document.createElement('li');
        let div = document.createElement('div');
        let closebtn = document.createElement('button');
        let editbtn = document.createElement('button');
        let editEnterbtn = document.createElement('button');
        let editClosebtn = document.createElement('button');
        let editInput = document.createElement('input');

        list.append(li);
        li.innerText = item.name;
        li.setAttribute('id', 'li');
        li.setAttribute('data-id', index);
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'LI') {
                let i = event.target.dataset.id;
                (todoList[i].checked === true) ? (todoList[i].checked = false) : (todoList[i].checked = true);
                render();
            };
        });

        li.append(div);
        div.append(closebtn);
        closebtn.textContent = 'X';
        closebtn.setAttribute('class', 'close');
        closebtn.setAttribute('data-idd', index);
        closebtn.addEventListener('click', (e) => {
            let i = event.target.dataset.idd;
            todoList.splice(i, 1);
            render();
        });

        div.append(editbtn);
        editbtn.textContent = 'edit';
        editbtn.setAttribute('class', 'edit');
        editbtn.setAttribute('data-idedit', index);
        editbtn.addEventListener('click', (e) => {

            e.stopImmediatePropagation();
            closebtn.setAttribute('style', 'display: none');
            editbtn.setAttribute( 'style', 'display: none');

            div.append(editEnterbtn);
            editEnterbtn.textContent = 'enter';
            editEnterbtn.setAttribute('class', 'editEnt');
            editEnterbtn.setAttribute('data-idedit', index);
            editEnterbtn.addEventListener('click', (e) => {
                let impValue = () => {
                    let impValue = document.getElementById('input-field-2').value;
                    return impValue;
                };
                if(impValue() !== '') {
                    todoList[i].name = impValue();
                } else {
                    alert('empty line!');
                }
                render();
            });

            div.append(editClosebtn);
            editClosebtn.textContent = 'X';
            editClosebtn.setAttribute('class', 'close');
            editClosebtn.setAttribute('data-idd', index);
            editClosebtn.addEventListener('click', (e) => {
                render();
            });

            let i = event.target.dataset.idedit;
            li.append(editInput);
            editInput.setAttribute('class', 'input-field-2');
            editInput.setAttribute('id', 'input-field-2');
            editInput.setAttribute('size','10');
            editInput.setAttribute('text-align','left');
            editInput.setAttribute('maxlength','12');
            editInput.setAttribute('value', todoList[i].name);
            editInput.addEventListener('keyup', (e) => {
                if(e.key === 'Enter') {
                    if(e.target.value !== '' && e.target.value !== null) {
                        todoList[i].name = e.target.value;
                    } else {
                        alert('empty line!');
                    };
                    render();
                };
            });
            editbtn.addEventListener('click', (e) => {
                todoList[i].name = e.target.value;
            });
        });

        if (todoList[index].checked === true) {
            li.classList.toggle('checked');
        };
    });
};

let loadSave = () => {
    if(localStorage.getItem('todoList')) {
        let j = localStorage.getItem('todoList');
        let y = JSON.parse(j);
        todoList = y;
    };
};

input.addEventListener('keyup', (enter) => {
    if(enter.key === 'Enter') {
        if(enter.target.value !== '') {
            todoList.push({
                name: enter.target.value,
                checked: false,
            });
        } else {
            alert('empty line!');
        };
        render();
        document.querySelector("#input-field").value = "";
    };
});

butt.addEventListener('click', (mouse) => {
    let impValue = () => {
        let impValue = document.getElementById('input-field').value;
        return impValue;
    };
    if(impValue() !== '') {
        todoList.push({
            name: impValue(),
            checked: false,
        });
    } else {
        alert('empty line!');
    }
    render();

    document.querySelector("#input-field").value = "";
});

clear.addEventListener('click',(cl) => {
    todoList.length = 0;
    render();
});

save.addEventListener('click',function(){
    let i = JSON.stringify(todoList);
    localStorage.setItem('todoList',i);
});

loadSave();
render();
