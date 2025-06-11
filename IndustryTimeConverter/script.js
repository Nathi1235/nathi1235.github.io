function conv(){
    var input = document.getElementById("input").value;
    console.log("Input: " + input);
    input = input.replace(/[^0-9|+*/().,h-]+/g, ''); // remove all whitespace
    console.log("Filter Input: " + input);
    let a = input.split(/[+*/-]+/);
    console.log("Filter Numbers: " + a.join("; "));
    try{
    for (let i = 0; i < a.length; i++) {
        if (a[i].includes('h') || a[i].includes(',')) {
            console.log("Filter Standard Time Numbers: " + a[i]);
            let b = a[i].split(/[h,]+/);
            let c = parseFloat(b[0]) + (b[1] ? parseFloat(b[1]) / 60 : 0);
            console.log("Convert to Industry Time: " + c);
            input = input.replace(a[i].toString(), c);
            console.log("Replace in original String: " + input);
        }
    }
    } catch (e) {
        console.error("Error in conversion: " + e);
        document.getElementById("result").innerHTML = "Invalid input. Please check your expression.";
        return;
    }
    try{
        let result = eval(input);
        console.log("Result: " + result);
        let output = "Industry Time: " + result + "h<br>Standard Time: " + parseInt(result) + "h" + Math.round(result%1) * 60;
        document.getElementById("result").innerHTML = output;
    } catch (e) {
        console.error("Error in evaluation: " + e);
        document.getElementById("result").innerHTML = "Invalid input. Please check your expression.";
    }
}