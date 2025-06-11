var pauses = 2;

function addPause() {
    pauses++;
    let pauseHTML = `<span id="pause${pauses}">
                    <label>${pauses}:</label>
                    <input onchange="calculate()" type="time" id="start_pause${pauses}" value="00:00">
                    <i> to </i>
                    <input onchange="calculate()" type="time" id="end_pause${pauses}" value="00:00">
                    <br>
                </span>\n`;
    document.getElementById("pauseList").innerHTML += pauseHTML;
}

function removePause() {
    if(pauses <= 0) {
        return;
    }
    document.getElementById("pause"+pauses).remove();
    pauses--;
}

function sti(a){
    let b = a.split(":");
    return parseFloat(b[0]) + (b[1] ? parseFloat(b[1]) / 60 : 0);
}

function its(a){
    let b = Math.floor(a);
    let c = Math.round((a - b) * 60);
    return (b < 10 ? "0" + b : b) + ":" + (c < 10 ? "0" + c : c);
}

function calculate() {
    let workOnMonday = document.getElementById("mondayCheckbox").checked;
    if(!workOnMonday){
        document.getElementById("mondayStartTime").style.display = "none";
        document.getElementById("mondayEndTime").style.display = "none";
    }else{
        document.getElementById("mondayStartTime").style.display = "block";
        document.getElementById("mondayEndTime").style.display = "block";
    }
    let workOnTuesday = document.getElementById("tuesdayCheckbox").checked;
    if(!workOnTuesday){
        document.getElementById("tuesdayStartTime").style.display = "none";
        document.getElementById("tuesdayEndTime").style.display = "none";
    }else{
        document.getElementById("tuesdayStartTime").style.display = "block";
        document.getElementById("tuesdayEndTime").style.display = "block";
    }
    let workOnWednesday = document.getElementById("wednesdayCheckbox").checked;
    if(!workOnWednesday){
        document.getElementById("wednesdayStartTime").style.display = "none";
        document.getElementById("wednesdayEndTime").style.display = "none";
    }else{
        document.getElementById("wednesdayStartTime").style.display = "block";
        document.getElementById("wednesdayEndTime").style.display = "block";
    }
    let workOnThursday = document.getElementById("thursdayCheckbox").checked;
    if(!workOnThursday){
        document.getElementById("thursdayStartTime").style.display = "none";
        document.getElementById("thursdayEndTime").style.display = "none";
    }else{
        document.getElementById("thursdayStartTime").style.display = "block";
        document.getElementById("thursdayEndTime").style.display = "block";
    }
    let workOnFriday = document.getElementById("fridayCheckbox").checked;
    if(!workOnFriday){
        document.getElementById("fridayStartTime").style.display = "none";
        document.getElementById("fridayEndTime").style.display = "none";
    }else{
        document.getElementById("fridayStartTime").style.display = "block";
        document.getElementById("fridayEndTime").style.display = "block";
    }

    let mondayEndTime = document.getElementById("endTimeMondayCheckbox").checked;
    if(!mondayEndTime){
        document.getElementById("endTimeMondayDiv").style.display = "none";
    }else{
        document.getElementById("endTimeMondayDiv").style.display = "block";
    }
    let tuesdayEndTime = document.getElementById("endTimeTuesdayCheckbox").checked;
    if(!tuesdayEndTime){
        document.getElementById("endTimeTuesdayDiv").style.display = "none";
    }else{
        document.getElementById("endTimeTuesdayDiv").style.display = "block";
    }
    let wednesdayEndTime = document.getElementById("endTimeWednesdayCheckbox").checked;
    if(!wednesdayEndTime){
        document.getElementById("endTimeWednesdayDiv").style.display = "none";
    }else{
        document.getElementById("endTimeWednesdayDiv").style.display = "block";
    }
    let thursdayEndTime = document.getElementById("endTimeThursdayCheckbox").checked;
    if(!thursdayEndTime){
        document.getElementById("endTimeThursdayDiv").style.display = "none";
    }else{
        document.getElementById("endTimeThursdayDiv").style.display = "block";
    }
    let fridayEndTime = document.getElementById("endTimeFridayCheckbox").checked;
    if(!fridayEndTime){
        document.getElementById("endTimeFridayDiv").style.display = "none";
    }else{
        document.getElementById("endTimeFridayDiv").style.display = "block";
    }


    var weeklyHours = parseFloat(document.getElementById("weeklyHours").value);

    var pause_array = [];
    for (let i = 1; i <= pauses; i++) {
        let startPause = document.getElementById("start_pause" + i).value;
        let endPause = document.getElementById("end_pause" + i).value;
        let pause_length = sti(endPause) - sti(startPause);
        if (pause_length < 0) {
            pause_length += 24;
        }
        if (startPause && endPause) {
            pause_array.push({ start: sti(startPause), end: sti(endPause), length: pause_length });
        }
    }
    var totalPause = pause_array.reduce((acc, pause) => acc + pause.length, 0);

    let startTimeMonday = sti(document.getElementById("startTimeMonday").value);
    let startTimeTuesday = sti(document.getElementById("startTimeTuesday").value);
    let startTimeWednesday = sti(document.getElementById("startTimeWednesday").value);
    let startTimeThursday = sti(document.getElementById("startTimeThursday").value);
    let startTimeFriday = sti(document.getElementById("startTimeFriday").value);

    let mondayWorkTime = 0;
    let tuesdayWorkTime = 0;
    let wednesdayWorkTime = 0;
    let thursdayWorkTime = 0;
    let fridayWorkTime = 0;

    if(mondayEndTime){
        var suggestedEndTimeMonday = sti(document.getElementById("endTimeMonday").value);
        mondayWorkTime = suggestedEndTimeMonday - startTimeMonday - totalPause;
    }
    if(tuesdayEndTime){
        var suggestedEndTimeTuesday = sti(document.getElementById("endTimeTuesday").value);
        tuesdayWorkTime = suggestedEndTimeTuesday - startTimeTuesday - totalPause;
    }
    if(wednesdayEndTime){
        var suggestedEndTimeWednesday = sti(document.getElementById("endTimeWednesday").value);
        wednesdayWorkTime = suggestedEndTimeWednesday - startTimeWednesday - totalPause;
    }
    if(thursdayEndTime){
        var suggestedEndTimeThursday = sti(document.getElementById("endTimeThursday").value);
        thursdayWorkTime = suggestedEndTimeThursday - startTimeThursday - totalPause;
    }
    if(fridayEndTime){
        var suggestedEndTimeFriday = sti(document.getElementById("endTimeFriday").value);
        fridayWorkTime = suggestedEndTimeFriday - startTimeFriday - totalPause;
    }
    
    let openDays = 0;
    if(!mondayWorkTime) openDays++;
    if(!tuesdayWorkTime) openDays++;
    if(!wednesdayWorkTime) openDays++;
    if(!thursdayWorkTime) openDays++;
    if(!fridayWorkTime) openDays++;

    if(!workOnMonday) openDays--;
    if(!workOnTuesday) openDays--;
    if(!workOnWednesday) openDays--;
    if(!workOnThursday) openDays--;
    if(!workOnFriday) openDays--;
    
    weeklyHours = weeklyHours - (mondayWorkTime + tuesdayWorkTime + wednesdayWorkTime + thursdayWorkTime + fridayWorkTime);
    let averageWorkTimePerDay = Math.round(weeklyHours / openDays * 100) / 100;
    console.log("Average Work Time Per Day: " + its(averageWorkTimePerDay).replace(":", "h ") + "m");
    let averageSpentTime = averageWorkTimePerDay + totalPause;
    console.log("Average Time Spent At Work Per Day: " + its(averageSpentTime).replace(":", "h ") + "m");
    if(!mondayWorkTime) {
        var suggestedEndTimeMonday = startTimeMonday + averageSpentTime;
    }
    if(!tuesdayWorkTime) {
        var suggestedEndTimeTuesday = startTimeTuesday + averageSpentTime;
    }
    if(!wednesdayWorkTime) {
        var suggestedEndTimeWednesday = startTimeWednesday + averageSpentTime;
    }
    if(!thursdayWorkTime) {
        var suggestedEndTimeThursday = startTimeThursday + averageSpentTime;
    }
    if(!fridayWorkTime) {
        var suggestedEndTimeFriday = startTimeFriday + averageSpentTime;
    }

    let outputString = ``;

    if(workOnMonday) {
        outputString += `Monday: ${its(suggestedEndTimeMonday)}<br>`;
    }
    if(workOnTuesday) {
        outputString += `Tuesday: ${its(suggestedEndTimeTuesday)}<br>`;
    }
    if(workOnWednesday) {
        outputString += `Wednesday: ${its(suggestedEndTimeWednesday)}<br>`;
    }
    if(workOnThursday) {
        outputString += `Thursday: ${its(suggestedEndTimeThursday)}<br>`;
    }
    if(workOnFriday) {
        outputString += `Friday: ${its(suggestedEndTimeFriday)}<br>`;
    }
    document.getElementById("TimeTable").innerHTML = outputString;
}