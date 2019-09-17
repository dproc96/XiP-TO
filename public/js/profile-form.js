$(document).ready(function () {
  $msgProfile = $("#profile-message");
  $msgPwd = $("#pwd-message");
  $msgImg = $("#img-message");

  function clearMessages() {
    $msgProfile.text("");
    $msgPwd.text("");
    $msgPwd.text("");
  }

  //insert the error message on the #message element
  function showErrorMessage(msg, $msgElement) {
    clearMessages();
    $msgElement.removeClass("success-message");
    $msgElement.text(msg).addClass("error-message");
  }

  //insert the success message on the #message element
  function showSuccessMessage(msg, $msgElement) {
    clearMessages();
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
      updateProfile(data, $msgProfile);
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
      updateProfile(data, $msgPwd);
    }
  }

  function updateProfile(data, $msg) {
    $.ajax({
      url: "/api/users",
      type: "PUT",
      data: data,

      error: err => {
        showErrorMessage(err.responseText, $msg);
        $(this).css("disabled", "false");
      },

      success: (res) => {
        if (res.fileName) {
          $("#picture").attr("src", `./images/uploads/${res.fileName}`);
        }
        else {
          showSuccessMessage("Profile updated!", $msg);
          $(this).css("disabled", "false");  
        }
        
      }
    });
  }

  function submitImg () {
    let $picture = $("#picture");

    $picture.css("display", "none");

    $("#upload-form").ajaxSubmit({

      error: function (xhr) {
        showErrorMessage(xhr.responseText, $msgImg);
      },

      success: function (file) {
        $picture.css("display", "block");
        $picture.attr("src", file.fullFileName);
        $("#image").val(file.fileName);
        
        updateProfile({ image: file.fileName }, $msgImg);
      }
    });
  }

  //when user clicks on the profile submit buttom
  $("#submit-profile").on("click", submitProfile);

  //when user clicks on the password submit buttom
  $("#submit-pwd").on("click", submitNewPwd);

  $("#file").change(submitImg);
  
});