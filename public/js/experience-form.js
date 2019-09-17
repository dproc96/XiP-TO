$(document).ready(function () {
  let $errorMsg = $("#error-message").css("display", "none");

  //initialize the algolia places (responsible to autocomplete the locations)
  for (let i = 1; i <= 3; i++) {
    places({
      container: document.querySelector(`#location${i}`),
      style: true
    });
    $(`#location${i}`).attr("class", "");
  }

  //when user clicks on the submit buttom
  $("#submit-btn").click(function () {
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
        location.href = "/profile/";
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

  $("#delete-btn").click(function () {
    event.preventDefault();
    let experienceId = $("#experience-id").val().trim();
    
    $.ajax({
      url: `/api/experiences/${experienceId}`,
      type: "DELETE",

      error: err => {
        console.log(err.responseText);
      },

      success: () => {
        location.href = "/profile";
      }

    });
  });
});