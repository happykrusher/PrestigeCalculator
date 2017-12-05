
//Global Variables
var $root = $('html, body');
	
$(document).ready(function () {
  
  //Get JSON Data and populate Xp Table
	//getJson();
  
  //Smooth Scrolling
  $('a[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $( $.attr(this, 'href') ).offset().top - 32
    }, 500);
    
    var x = document.getElementById("navDemo");
    x.className = x.className.replace(" w3-show", "");

    return false;
  });
  
	
	
});

function getJson(){
	$.getJSON(
      "json/xpData.json", function(json) {
		  
		  populateFromJson(json);
	  }
    ).fail(function(){
      console.log("failed");
    });
}

function populateFromJson(json) {
	/*
		This function populates table with data from JSON
	*/
	
  
  
}
