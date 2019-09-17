$(document).ready(function () {
  $msgProfile = $("#profile-message");
  $msgPwd = $("#pwd-message");

  //insert the error message on the #message element
  function showErrorMessage(msg, $msgElement) {
    $msgElement.removeClass("success-message");
    $msgElement.text(msg).addClass("error-message");
  }

  //insert the success message on the #message element
  function showSuccessMessage(msg, $msgElement) {
    $msgElement.removeClass("error-message");
    $msgElement.text(msg).addClass("success-message");
  }

  function submitProfile () {
    event.preventDefault();

    //disable the submit buttom
    $(this).css("disabled", "true");

    let data = {
      firstname: $("#firstname").val().trim(),
      lastname: $("#lastname").val().trim(),
      image: $("#image").val().trim(),
      email: $("#email").val().trim()
    };

    if (!data.firstname || !data.lastname || !data.email) {
      showErrorMessage("* All fields must be entered", $msgProfile);
    }
    else {
      $.ajax({
        url: "/api/users",
        type: "PUT",
        data: data,
  
        error: err => {
          showErrorMessage(err.responseText, $msgProfile);
          $(this).css("disabled", "false");
        },
  
        success: () => {
          showSuccessMessage("Account updated successfully!", $msgProfile);
          $(this).css("disabled", "false");
        }
      });
    }
  }

  function submitNewPwd () {
    event.preventDefault();
    //disable the submit buttom
    $(this).css("disabled", "true");
    let confirmPwd = $("#confirm-password").val().trim();

    let data = {
      password: $("#password").val().trim()
    };

    if (!data.password || !confirmPwd) {
      showErrorMessage("* All fields must be entered", $msgPwd);
    }
    else if (data.password !== confirmPwd) {
      showErrorMessage("* Passwords must match", $msgPwd);
    }
    else {
      $.ajax({
        url: "/api/users",
        type: "PUT",
        data: data,

        error: err => {
          showErrorMessage(err.responseText, $msgPwd);
          $(this).css("disabled", "false");
        },

        success: () => {
          showSuccessMessage("Password updated successfully!", $msgPwd);
          $(this).css("disabled", "false");
        }
      });
    }
  }

  //when user clicks on the profile submit buttom
  $("#submit-profile").on("click", submitProfile);

  //when user clicks on the password submit buttom
  $("#submit-pwd").on("click", submitNewPwd);

  $("#file").change(function () {
    let $picture = $("#picture");

    $picture.css("display", "none");

    $("#upload-form").ajaxSubmit({

      error: function (xhr) {
        showErrorMessage(xhr.responseText,$msgProfile);
      },

      success: function (file) {
        $picture.css("display", "block");
        $picture.attr("src", file.fullFileName);
        $("#image").val(file.fileName);
        showSuccessMessage("",$msgProfile);
      }
    });
  });
  
});