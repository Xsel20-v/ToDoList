const form = document.getElementById('small');
const input = document.querySelector('.smallinput');
const cont = document.getElementById('cont');

let todolist = [];
let itemId = 0;

const emoji = ["☑️","✅","✏️","💾","🔥"];

function newel(type,classname){
    const el = document.createElement(type);
    el.classList.add(classname);
    
    return el;
}

function newinput(classname,value){
    const input = newel("input",classname);
    input.type = "text";
    input.value = value;
    input.setAttribute("readonly","readonly");

    input.dataset.index = "item"+itemId++;

    return input;
}

function newbtn(classname,inner){
    const button = newel("button",classname);
    button.innerHTML = inner;

    return button;
}

function createItem(text,done=false,isOld=false){ 

const sfull = newel("div","sfull");

if(done)sfull.classList.add("itemdone");

const check = newel("div","check");
sfull.appendChild(check);

const sdone = newbtn("sdone",emoji[0]);
check.appendChild(sdone);
sdone.onclick = doneItem(sfull);

const sisi = newel("div","sisi");
sfull.appendChild(sisi);

const sisinput = newinput("small",text);
sisi.appendChild(sisinput);

const sbtn = newel("div","sbtn");
sfull.appendChild(sbtn);

const sedit = newbtn("sedit",emoji[2]);
sbtn.appendChild(sedit);
sedit.onclick = editItem(sfull);

const sdelete = newbtn("sdelete",emoji[4]);
sbtn.appendChild(sdelete);
sdelete.onclick = deleteItem(sfull);

cont.appendChild(sfull);

input.value = '';

//to put into array
const id = sisinput.dataset.index;
if(!isOld)todolist.push({id,text,isDone:false});
}
function newListItem(e){
    e.preventDefault();
    createItem(input.value);
    }
function editItem(){
    return function(e){
        const sisinput = e.target.closest(".sfull").querySelector(".small");
        if(e.target.innerText.toLowerCase()==emoji[2]){
            sisinput.removeAttribute("readonly");
            sisinput.focus();
            e.target.innerText =emoji[3];
        }else{
            sisinput.setAttribute("readonly","readonly");
            e.target.innerText =emoji[2];
            const editedItem = todolist.find(item=>item.id == sisinput.dataset.index);
            editedItem.text = sisinput.value;
        }
    }
}
function deleteItem(item){
    return function(e){
        const del = document.querySelector(".small").value;
        todolist.splice(todolist.indexOf(del),1);
        item.parentElement.removeChild(item);
    }
}
function doneItem(){
    return function(e){
        const itemwrapper = e.target.closest(".sfull");
        itemwrapper.classList.toggle("itemdone");
        
        const sisinput = e.target.closest(".sfull").querySelector(".small");
        const isDone = itemwrapper.classList.contains("itemdone");
        e.target.innerText =emoji[0];
        if(isDone) e.target.innerText =emoji[1];
        const editedItem = todolist.find(item=>item.id == sisinput.dataset.index);
        editedItem.isDone = isDone;
    }
}

form.addEventListener('submit',newListItem);