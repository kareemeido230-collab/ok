let title = document.getElementById('title');
let price = document.getElementById('price');
let note = document.getElementById('note');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let tbody = document.getElementById('tbody');

let dataPro = [];
let mood = 'create';
let tmp;

const date = new Date()
function myDateNow(){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const dateNow = `(${day}/${month}/${year}) - ${hour}:${minutes}`
    return dateNow;
}

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value,
        price: price.value,
        note: note.value,
        mydate: myDateNow(),
    }
    
    if(title.value != '' && price.value){
        if(mood === 'create'){
            dataPro.push(newPro);
        }else{
            dataPro[tmp] = newPro;
            submit.innerHTML = 'إضافة';
            mood = 'create'
        }
    }
    
    localStorage.product = JSON.stringify(dataPro);
    showData();
    clearInputs();
}

function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td class="name">${dataPro[i].title}</td>
                <td class="date">${dataPro[i].price}<br><small>${dataPro[i].mydate}</small></td>
                <td class="note">${dataPro[i].note}</td>
                <td><button onclick="updateItem(${i})" id="update">تعديل</button></td>
                <td><button onclick="deleteItem(${i})" id="delete">حذف</button></td>
            </tr>
        `
    };
    tbody.innerHTML = table;
};
showData();

function clearInputs(){
    title.value = '';
    note.value = '';
    price.value = '';
};

function deleteItem(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function updateItem(i){
    submit.innerHTML = 'تعديل';
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    note.value = dataPro[i].note
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].title.includes(value.trim())){
            table += `
                <tr>
                    <td>${i+1}</td>
                    <td class="name">${dataPro[i].title}</td>
                    <td class="date">${dataPro[i].price}<br><small>${dataPro[i].mydate}</small></td>
                    <td class="note">${dataPro[i].note}</td>
                    <td><button onclick="updateItem(${i})" id="update">تعديل</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">حذف</button></td>
                </tr>
            `
        };
    };
    tbody.innerHTML = table;
}
onload = function(){
    title.focus();
}
//     let dateNow = new Date();
// console.log(dateNow);
