var meals;
var meals_taken = [];

function refresh_all(){
    let currentDate = new Date();
    var weekdays = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
    let num = constrain(document.getElementById("ref_all").value,0,meals.length-1);
    document.getElementById("ref_all").value = num;
    let content = "";
    meals_taken = [];
    for(let row = 0; row < num; row++){
        let meal = getRandomFood();
        content += "<tr class='table_rows'><th class='table_entry'>"+weekdays[(currentDate.getDay()+row+1)%7]+"</th><th class='table_entry' id="+row+">"+meal+"</th><th>"+"<button onclick='refresh("+row+")'>↻</button>"+"</th></tr>";
    }
    document.getElementById("food_table").innerHTML = content;
}

function refresh(row){
    let index = meals_taken.indexOf(document.getElementById(row).innerHTML);
    if(index > -1){
        meals_taken.splice(index,1);
    }
    console.log(meals_taken);
    document.getElementById(row).innerHTML = getRandomFood();
}

function getRandomFood(){
    let meal;
    do{
        meal = meals[Math.floor(Math.random() * meals.length)];
    }while(meals_taken.includes(meal))
    meals_taken.push(meal);
    return meal;
}

async function load_food(){
    const res = await fetch('./data.json');
    meals = await res.json();
}

function load(){
    load_food();
    setTimeout(refresh_all,10);
    document.getElementById("year").innerText = new Date().getFullYear();
}

function constrain(number,min,max){
    return Math.min(Math.max(number,min),max);
}