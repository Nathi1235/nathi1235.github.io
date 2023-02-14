function init(){
    counter = 0;
    active_row = 1;
    document.getElementById("year").innerHTML = " "+new Date().getFullYear();
    document.getElementsByClassName("cell")[0].className = "cell active";
    document.addEventListener('keydown', function(event) {
        if((/[A-Za-z]/.test(event.key) && event.key.length == 1) ||  event.key == 'Enter'  || event.key == 'Backspace'){
            if(event.key == "Backspace"){
                writeBackspace(document.getElementsByClassName("cell active"));
            }else if(event.key == "Enter"){
                writeEnter(document.getElementsByClassName("cell active"));
            }else{
                writeKey(document.getElementsByClassName("cell active"),event.key.toUpperCase());
            }
        }
    });
    
    document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target;
        if(target.className == "key"){
            if(target == document.getElementById("backspace-key")){
                writeBackspace(document.getElementsByClassName("cell active"));
            }else if(target == document.getElementById("enter-key")){
                writeEnter(document.getElementsByClassName("cell active"));
            }else{
                writeKey(document.getElementsByClassName("cell active"),target.innerHTML);
            }
        }
        if(target.className == "cell"){
            if(Array.prototype.slice.call(document.getElementsByClassName("cell")).indexOf(target) < (active_row*wordLength) && Array.prototype.slice.call(document.getElementsByClassName("cell")).indexOf(target) > ((active_row-1)*wordLength)-1){
                if(document.getElementsByClassName("cell active").length > 0){
                    document.getElementsByClassName("cell active")[0].classList.remove("active");
                }
                target.className = "cell active";
                var nodes = Array.prototype.slice.call(document.getElementsByClassName("cell"));
                counter = nodes.indexOf(target);
            }
        }
    }, false);
}

function setField(){
    code = getURLParam()
    if(code == null || code.length == 0){
        searchWord = "BARBIST"; //:)
    }else{
        searchWord = decode(getURLParam());
    }
    wordLength = searchWord.length;
    var field = '<div class="cell"></div>\n'.repeat((wordLength+1)*wordLength);
    board = document.getElementById("board");
    board.innerHTML = field;
    board.style = `grid-template-columns: repeat(${wordLength}, 1fr);`;
}

function getURLParam(){
    return new URLSearchParams(window.location.search).get('code')
}

function createNewURL(text){
    return `${new URL(document.URL).hostname}/?code=${encode(text)}`
}

function encode(text){
    return btoa(text.toUpperCase());
}
function decode(text){
    return atob(text).toUpperCase();
}

function writeKey(target,key){
    if(document.getElementsByClassName("cell active").length > 0){
        target[0].innerHTML = key;
        if(counter < active_row*wordLength-1){
            document.getElementsByClassName("cell active")[0].className = "cell";
            document.getElementsByClassName("cell")[counter+1].className = "cell active";
            counter += 1;
        }else{
            document.getElementsByClassName("cell active")[0].className = "cell";
        }
    }
}
function writeBackspace(target){
    if(target[0] == null){
        document.getElementsByClassName("cell")[active_row*wordLength-1].className = "cell active";
        document.getElementsByClassName("cell")[active_row*wordLength-1].innerHTML = " ";
    }else if(counter > (active_row-1)*wordLength){
        var nodes = Array.prototype.slice.call(document.getElementsByClassName("cell"));
        new_active = document.getElementsByClassName("cell")[nodes.indexOf(target[0])-1];
        target[0].classList.remove("active");
        new_active.className = "cell active";
        target[0].innerHTML = " ";
        counter -= 1;
    }else{
        target[0].innerHTML = " ";
    }
}
function writeEnter(target){
    test = checkWord();
    if(test == null){
        return;
    }
    if(target[0] != null){
        target[0].className = "cell";
    }
    if(active_row < wordLength+1){
        document.getElementsByClassName("cell")[active_row*wordLength].className = "cell active";
        active_row += 1;
        counter = (active_row-1)*wordLength;
    }
}

function checkWord(){
    word = "";
    for(var i = 0; i < wordLength; i++){
        word += document.getElementsByClassName("cell")[(active_row-1)*wordLength+i].innerHTML;
    }
    if(word.length != wordLength){
        return null;
    }
    for(var i = 0; i < wordLength; i++){
        if(word[i] == searchWord[i]){
            document.getElementsByClassName("cell")[(active_row-1)*wordLength+i].className = "cell correct";
        }else if(searchWord.includes(word[i])){
            document.getElementsByClassName("cell")[(active_row-1)*wordLength+i].className = "cell moved";
        }else{
            document.getElementsByClassName("cell")[(active_row-1)*wordLength+i].className = "cell false";
        }
    }
    return true;
}

function createWordle(){
    window.location.replace("createWordle.html")
}

function updateURL(){
    document.getElementsByClassName("url-field")[0].value = createNewURL(document.getElementsByClassName("word-input")[0].value);
}

async function copy(){
    var copyText = document.getElementsByClassName("url-field")[0];
    copyText.select();
    copyText.setSelectionRange(0,99999);
    copyText.focus();
    document.execCommand('copy');
}