
//Global Variables	
var maxXp = 0;
	
$(document).ready(function () {
	
	//Get JSON Data and populate Xp Table
	getJson();
	
});

$('#xpDataForm').submit(function( event ) {
	
	/*
		When form is submitted get values and display results
	*/
	
	var xpInput = Number($('#xpInput').val());
	var timeInput = Number($('#timeInput').val());
	var runs = Number(maxXp / xpInput).toFixed(1);
	var time = Number(timeInput * runs);
	
	//If xp value was input update rounds to prestige
	if (xpInput > 0) {
		$('#runResult').text(runs.toString() + " Rounds to prestige");
		updateRuns(xpInput);
	} else {
		alert("Please Enter amount of XP Earned per round.")
	}
	
	//If time value was input update time to prestige
	if (timeInput > 0) {
		$('#timeResult').text(minTomm(time.toFixed(2)).toString() + " to prestige");
	}

	event.preventDefault();
});

function updateRuns(xpInput){
	/*
		Find the table and adds or updates the 4rd column
	*/
	
	var runs = 0;
	var remainingXp = 0;
	
	//Check if runs th is visible
	if($('#runs').css('display') == 'none') {
		$('#runs').show();
	}
	
	$('#xpDataTable').find('tr').each(function(){
		
		remainingXp = Number($(this).find('td:nth-child(3)').html());
		runs = remainingXp / xpInput;
		runs = runs.toFixed(1);
		//Update Column
		if ($(this).find('td:nth-child(4)').length == 0){
			//Add column with run data
			$(this).find('td:last-child').eq(0).after('<td>' + runs + '</td>');
		} else {
			//Edit existing column with new run data
			$(this).find('td:last-child').eq(0).html(runs);
		}
		
    });
}

function minTomm(minutes){
 var sign = minutes < 0 ? "-" : "";
 var min = Math.floor(Math.abs(minutes));
 return sign + (min < 10 ? "0" : "") + min + " Minutes";
}

function getJson(){
	$.getJSON(
      "json/xpData.json", function(json) {
		  
		  populateXpData(json);
	  }
    ).fail(function(){
      console.log("failed");
    });
}

function setMaxXp(json){
	/*
		Update max xp from json data
	*/
	for (var i = 0; i < json.length; i++) {
		var xp = Number(json[i].xp);
		maxXp = xp + maxXp;
		}
};

function populateXpData(json) {
	/*
		This function populates table with xp data from JSON
	*/
	
	setMaxXp(json);
	remainingXp = maxXp;
    for (var i = 0; i < json.length; i++) {
		$('#xpDataTable tbody').append('<tr class="child"><td>' + json[i].level + '</td> <td>' + json[i].xp + '</td> <td>' + remainingXp + '</td></tr>');
		remainingXp = remainingXp - json[i].xp;
		}
		
		//List total Xp from lv.1 - lv.50
		$('#totalXP').text(maxXp.toString() + " XP from lv.1 - lv.50");
		
}
