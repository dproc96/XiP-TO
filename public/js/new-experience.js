$(document).ready(function () {
  var totLocations = 1;
  var location1 = $("#location1"); 
  var location2 = $("#location2"); 
  var location3 = $("#location3"); 

  //hide the 2 extra locations
  location2.css("display", "none");
  location3.css("display", "none");

  //initialize the algolia places (responsible to autocomplete the locations)
  for(let i = 1; i <= 3; i++) {
    places({
      container: document.querySelector(`#location${i}`),
      style: true
    });
  }

  //when user clicks on the button to add new location
  $("#add-location").click(function () {
    event.preventDefault();
    
    if (totLocations === 1) {
      location2.css("display", "block");
      totLocations = 2;
    }
    else {
      location3.css("display", "block");
      totLocations = 3;
      $(this).css("display", "none");
    }
  });
  
  

    
    
});
  
