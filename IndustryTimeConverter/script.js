function conv(){
    let input = document.getElementById("input").value;
    input = input.replace(/[^0-9|+*/.-]+/g, ''); // remove all whitespace
    let result = eval(input);
    let output = "Industry Time: " + result + "h<br>Standard Time: " + parseInt(result) + "h" + parseInt(result%1 * 60);
    document.getElementById("result").innerHTML = output;
}