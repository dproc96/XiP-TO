$(document).ready(function () {
  let totLocations = 1;
  let $errorMsg = $("#error-message").css("display", "none");
  let $location2 = $("#location2");
  let $location3 = $("#location3");

  if ($location2.val().trim() === "") {
    $location2.css("display", "none");
  }
  else {
    totLocations++;
  }

  if ($location3.val().trim() !== "") {
    $location3.css("display", "none");
  }
  else {
    totLocations++;
  }

  if (totLocations === 3) {
    $("#add-location").css("display", "none");
  }

  //initialize the algolia places (responsible to autocomplete the locations)
  for (let i = 1; i <= 3; i++) {
    places({
      container: document.querySelector(`#location${i}`),
      style: true
    });
    $(`#location${i}`).attr("class", "");
  }

  //when user clicks on the button to add new location
  $("#add-location").on("click", function (event) {

    event.preventDefault();

    if ($location2.css("display") === "none") {
      $location2.css("display", "block");
    }
    else if ($location3.css("display") === "none") {
      $location3.css("display", "block");
    }
    else {
      $(this).css("display", "none");
    }
  });

  //when user clicks on the submit buttom

  $("#experience-form").submit(function () {
    let $submitButton = $("#submit-btn");


    $submitButton.click(function (event) {
      event.preventDefault();


      //change the label and disable the submit buttom
      $(this).text("Sending...").css("disabled", "true");

      let data = {
        name: $("#name").val().trim(),
        description: $("#description").val().trim(),
        image: $("#image").val().trim(),
        CategoryId: $("#category").val().trim(),
        location: $("#location1").val().trim(),
        location2: $("#location2").val().trim(),
        location3: $("#location3").val().trim()
      };

      let experienceId = $("#experience-id").val().trim();
      let method = "POST";

      if (experienceId !== "") {
        method = "PUT";
        data.id = experienceId;
      }

      $.ajax({
        url: "/api/experiences",
        type: method,
        data: data,

        error: err => {
          $errorMsg.text(err.responseText).css("display", "block");
          $(this).text("Send").css("disabled", "false");
        },

        success: () => {
          location.reload();
        }

      });

    });

    $("#file").change(function () {
      let $picture = $("#picture");

      $picture.css("display", "none");

      $("#upload-form").ajaxSubmit({

        error: function (xhr) {
          $errorMsg.text(xhr.responseText).css("display", "block");
        },

        success: function (file) {
          $picture.css("display", "block");
          $picture.attr("src", file.fullFileName);
          $("#image").val(file.fileName);
          $errorMsg.text("");
        }

      });
    });
  });
});