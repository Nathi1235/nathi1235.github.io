var data;
var disease;
var cABCDE;
var measures;

function website_init(){
    load_json();
    setTimeout(getRandom,100);
    //document.getElementById("year").innerText = new Date().getFullYear();
}

async function load_json(){
    const res = await fetch('./Krankheitsbilder.json');
    data = await res.json();
}

function getRandom(){
    let diseases = Object.keys(data);
    disease = diseases[Math.floor(Math.random() * diseases.length)];
    cABCDE = data[disease];
    measures = data[disease].Maßnahmen;
}


function check(){
    let x = document.getElementById("guess_input").value.toLowerCase();
    let found = false;
    Object.keys(cABCDE).forEach(obj_key => {
        Object.keys(cABCDE[obj_key]).forEach(element => {
            if(x == element.toLowerCase()){
                found = true;
                document.getElementById(obj_key).innerHTML += element+":"+cABCDE[obj_key][element]+"<br>";
            }
        });
    });
    if(!found){
        document.getElementById("error").innerHTML = "<p style='color:red'>404 Not Found</p>";
    }else{
        document.getElementById("error").innerHTML = "";
    }
}

function reveal(){
    document.getElementById("disease").innerHTML = "<p style='color:blue'>"+disease+"</p>";
    document.getElementById("measures").innerHTML = "Maßnahmen:"+measures;
}