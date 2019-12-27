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
        let closebtn = document.createElement('button');
        let editbtn = document.createElement('button');
        let editInput = document.createElement('input');

        list.append(li);
        li.innerText = item.name;
        li.setAttribute('id', 'li');
        li.setAttribute('data-id', index);
        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'LI') {
                let i = event.target.dataset.id;
                (todoList[i].checked == true) ? (todoList[i].checked = false) : (todoList[i].checked = true);
                render();
            };
        });

        li.append(closebtn);
        closebtn.textContent = 'X';
        closebtn.setAttribute('class', 'close');
        closebtn.setAttribute('data-idd', index);
        closebtn.addEventListener('click', (e) => {
            let i = event.target.dataset.idd;
            todoList.splice(i, 1);
            render();
        });

        li.append(editbtn);
        editbtn.textContent = 'editing';
        editbtn.setAttribute('class', 'edit');
        editbtn.setAttribute('data-idedit', index);
        editbtn.addEventListener('click', (e) => {
            let i = event.target.dataset.idedit;
            li.append(editInput);
            editInput.setAttribute('class', 'input-field-2');
            editInput.setAttribute('size','10');
            editInput.addEventListener('keyup', (e) => {
                if(e.key === 'Enter') {
                    if(e.target.value !== '' && e.target.value !== null){
                        todoList[i].name = e.target.value;
                    } else {
                        alert('empty line!');
                    };
                    render();
                };
            });
        });

        if (todoList[index].checked == true) {
            li.classList.toggle('checked');
        }
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
