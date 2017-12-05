
//Global Variables
var $root = $('html, body');	
var maxXp = 0;
	
$(document).ready(function () {
  
  //submit btn-calculate on enter key press
  $('#input-xp').keypress(function(e){
    if(e.keyCode==13)
      $('#btn-calculate').click();
  });
  
  $('#input-time').keypress(function(e){
    if(e.keyCode==13)
      $('#btn-calculate').click();
  });
  
  
  //Smooth Scrolling
  $('a[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top - 32
    }, 500);
    
    var x = document.getElementById("navDemo");
    x.className = x.className.replace(" w3-show", "");

    return false;
  });
  
	//Get JSON Data and populate Xp Table
	getJson();
	
});

$('#btn-calculate').click(function( event ) {
	
	/*
		When form is submitted get values and display results
	*/
	
	var xpInput = Number($('#input-xp').val());
	var timeInput = Number($('#input-time').val());
	var rounds = Number(maxXp / xpInput).toFixed(1);
	var time = Number(timeInput * rounds);
	
	//If xp value was input update rounds to prestige
	if (xpInput > 0) {
		$('#p-rounds').text(rounds.toString());
		updateRounds(xpInput);
    
    //Check if div-results is visible
    if($('#div-results').hasClass('hidden')) {
      $('#div-results').removeClass('hidden');
    }
    
    $root.animate({
      scrollTop: $('#div-results').offset().top - parseInt($("#div-results").css("padding-top"))
    }, 500);
    
	} else {
		alert("Please Enter amount of XP Earned per round.")
	}
	
	//If time value was input update time to prestige
	if (timeInput > 0) {
		$('#p-time').text(timeConvert(time.toFixed(2)));
	}

	event.preventDefault();
});

function updateRounds(xpInput){
	/*
		Find the table and adds or updates the 4rd column
	*/
	
	var rounds = 0;
	var remainingXp = 0;
	
	//Check if rounds th is visible
	if($('#table-xp-data').find('th:nth-child(4)').hasClass('hidden')) {
		$('#table-xp-data').find('th:nth-child(4)').removeClass('hidden');
    
	}
	
	$('#table-xp-data').find('tr').each(function(){
		
		remainingXp = Number($(this).find('td:nth-child(3)').html());
		rounds = remainingXp / xpInput;
		rounds = rounds.toFixed(1);
		//Update Column
		if ($(this).find('td:nth-child(4)').length == 0){
			//Add column with round data
			$(this).find('td:last-child').eq(0).after('<td>' + rounds + '</td>');
		} else {
			//Edit existing column with new round data
			$(this).find('td:last-child').eq(0).html(rounds);
		}
		
    });
}

function timeConvert(mins) {
  var minutes = (mins % 60);
  var hours = (mins - minutes) / 60;
  var ans;
  
  if (hours >= 1){
    ans = hours + ' Hours ' + Math.floor(minutes) + ' Minutes';
  } else {
    ans = Math.floor(minutes) + ' Minutes';
  }
  
  return ans;
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
		$('#table-xp-data tbody').append('<tr class="child"><td>' + json[i].level + '</td> <td>' + json[i].xp + '</td> <td>' + remainingXp + '</td></tr>');
		remainingXp = remainingXp - json[i].xp;
		}
		
		//List total Xp from lv.1 - lv.50
		$('#h-total-xp').text(maxXp.toString());
		
}
