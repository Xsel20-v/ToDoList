const form = document.getElementById('small');
const input = document.querySelector('.smallinput');
const cont = document.getElementById('cont');

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

    return input;
}
function newbtn(classname,inner){
    const button = newel("button",classname);
    button.innerHTML = inner;

    return button;
}

function createItem(text){ 

const sfull = newel("div","sfull");

const check = newel("div","check");
sfull.appendChild(check);

const sdone = newbtn("sdone",emoji[0]);
check.appendChild(sdone);

const sisi = newel("div","sisi");
sfull.appendChild(sisi);

const sisinput = newinput("small",text);
sisi.appendChild(sisinput);

const sbtn = newel("div","sbtn");
sfull.appendChild(sbtn);

const sedit = newbtn("sedit",emoji[2]);
sbtn.appendChild(sedit);

const sdelete = newbtn("sdelete",emoji[4]);
sbtn.appendChild(sdelete);

cont.appendChild(sfull);

input.value = '';
}

function newListItem(e){
    e.preventDefault();
    createItem(input.value);
    }

form.addEventListener('submit',newListItem);