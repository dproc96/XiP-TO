$(document).ready(function () {
  var totLocations = 1;
  var $errorMsg = $("#error-message").css("display","none");
  var $location2 = $("#location2"); 
  var $location3 = $("#location3"); 

  //hide the 2 extra locations
  $location2.css("display", "none");
  $location3.css("display", "none");

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
      $location2.css("display", "block");
      totLocations = 2;
    }
    else {
      $location3.css("display", "block");
      totLocations = 3;
      $(this).css("display", "none");
    }
  });
  
  //when user clicks on the submit buttom
  $("#experience-form").submit(function () {
    var $submitButtom = $("#submit-btn");
    
    //change the label and disable the submit buttom
    $submitButtom.text("Sending...").css("disabled","true");

    //submit the form to the api on the action attribute
    $(this).ajaxSubmit({

      error: function (xhr) {
        $errorMsg.text(xhr.responseText).css("display", "block");
        $submitButtom.text("Send").css("disabled","false");
      },

      success: function () {
        document.location.reload();
      }

    });
    
    //Very important line, it disable the page refresh.
    return false;
  });      

    
    
});
  
