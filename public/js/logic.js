//insert the error message on the #message element
function showErrorMessage(msg) {
  $("#message").removeClass("success-message");  
  $("#message").text(msg).addClass("error-message");  
}

//insert the success message on the #message element
function showSuccessMessage(msg) {
  $("#message").removeClass("error-message");  
  $("#message").text(msg).addClass("success-message");  
}

//hide an element of the dom. Sample: hideElement("myelementid")
function hideElement(elementId) {
  elementId = elementId.replace("#", "");
  $(`#${elementId}`).css("display", "none");
}

//show an element of the dom. Sample: showElement("myelementid") or showElement("myelementid","block")
function showElement(elementId, display) {
  elementId = elementId.replace("#", "");
  if (typeof display === "undefined") {
    display = "block";
  }
  
  $(`#${elementId}`).css("display", "block");
}

$(document).on("click", "#sign-in", function () {
  $("#overlay").attr("class", "overlay");
  $("#sign-in-modal").attr("class", "modal");
});

$(document).on("click", "#close-modal", function() {
  $("#overlay").attr("class", "overlay hidden");
  $("#sign-in-modal").attr("class", "modal hidden");
  $("#sign-up-modal").attr("class", "modal hidden");

});

$(document).on("click", "#menu", function() {
  let nav = $("#nav");
  if (nav.attr("class") === "desktop-only") {
    nav.attr("class", "");
  } else {
    nav.attr("class", "desktop-only");
  }
});

$(document).on("click", "#signUp", function() {
  $("#sign-in-modal").attr("class", "modal hidden");
  $("#sign-up-modal").attr("class", "modal");
});

$(document).on("click", "#submitUserInformation", postUserInfo);

if ($(".slide").length) {
  $(".slide").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [{
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      }
    }],
    variableWidth: true,
    nextArrow: "<button type='button' data-role='none' class='slick-next slick-arrow' aria-label='Next' role='button' style='display: block;'>Next</button>",
    prevArrow: "<button type='button' data-role='none' class='slick-prev slick-arrow' aria-label='Next' role='button' style='display: block;'>Next</button>"
  });
}

function postUserInfo(event) {
  event.preventDefault();

  let newUserInfo={
    firstname: $("#signUpFirstName").val().trim(),
    lastname: $("#signUpLastName").val().trim(),
    email: $("#signUpEmail").val().trim(),
    password: $("#signUpPassword").val().trim(),
    score: 0,
    active: true
  };

  if (!newUserInfo.firstname || !newUserInfo.lastname || !newUserInfo.email || !newUserInfo.password) {
    alertInSignUp("* All fields must be entered");
  }
  else {
    if (newUserInfo.password === $("#reenterSignUpPassword").val()) {
      $.post("/api/users", newUserInfo, function(){
        location.reload();
      });
    }
    else {
      alertInSignUp("* Passwords must match");
    }
  }
}

function alertInSignUp(message) {
  $("#sign-up-modal").append(`<p id='alert' class='error-message'>${message}</p>`);
  setTimeout(function () {
    $("#alert").remove();
  }, 5000);
}

//hide the send and cancel button to request a new password
$("#resetPwd").css("display", "none");
$("#cancelResetPwd").css("display", "none");

//send a request to new password
$("#resetPwd").click(function () {
  let email = $("#signInEmail").val().trim();

  $.ajax("/api/users/resetpwd", {
    method: "POST",
    data: { email: email}
  }).then(() => {
    showSuccessMessage("Your new password was sent. Check your inbox in a few minutes!");
  }).catch(err => {
    showErrorMessage(err.responseText);
  });
  
});

//when clicks on forgot password
$("#forgot-pwd").click(function () {
  event.preventDefault();
  
  $("#title-signIn").text("Request a new password");

  //hide the unecessary fields to request a new password
  hideElement("signInPassword");
  
  //hide sign in and sign up buttons and forgot passoword link
  hideElement("submitSignIn");
  hideElement("signUp");
  hideElement("forgot-pwd");
  
  //show reset and cancel buttons
  showElement("resetPwd");
  showElement("cancelResetPwd");
  
});

//when clicks on cancel button to request a password to show default modal sign in fields
$("#cancelResetPwd").click(function () {

  $("#title-signIn").text("Welcome Back!");

  //show the unecessary fields to request a new password
  showElement("signInPassword");
  
  //show sign in and sign up buttons and forgot passoword link
  showElement("submitSignIn");
  showElement("signUp");
  showElement("forgot-pwd");
  
  //hide reset and cancel buttons
  hideElement("resetPwd");
  hideElement("cancelResetPwd");
});
