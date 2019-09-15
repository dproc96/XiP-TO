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
  $("#modal").attr("class", "modal");
});

$(document).on("click", "#close-modal", function() {
  // $("#overlay").attr("class", "overlay hidden");
  // $("#modal").attr("class", "modal hidden");

  //reload the page to update the default status of the modal
  location.reload();
});

$(document).on("click", "#menu", function() {
  let nav = $("#nav");
  if (nav.attr("class") === "desktop-only") {
    nav.attr("class", "");
  } else {
    nav.attr("class", "desktop-only");
  }
});

$(document).on("click", "#signUP", makeNewModal);

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

function makeNewModal(event) {
  event.preventDefault();

  $("#modal").empty();

  var newModal = $("<modal>").addClass("modal");

  var xIcon = $("<i>")
    .attr("id", "close-modal")
    .addClass("fas fa-times btn-close");
  var firstNameRow = $("<input>").attr({
    type: "text",
    id: "inputFirstName",
    placeholder: "First Name",
    required: "true"
  });
  var lastNameRow = $("<input>").attr({
    type: "text",
    id: "inputlastName",
    placeholder: "Last Name",
    required: "true"
  });

  var emailRow = $("<input>").attr({
    type: "email",
    id: "inputEmail",
    placeholder: "Email Address",
    required: "true",
    autofocus: "true"
  });
  var passswordRow = $("<input>").attr({
    type: "text",
    id: "inputPassword",
    placeholder: "Password",
    required: "true"
  });
  var reEnterPassswordRow = $("<input>").attr({
    type: "text",
    id: "reinputPassword",
    placeholder: "ReEnter Password",
    required: "true"
  });

  var submitBtn = $("<a>")
    .attr("id", "submitUserInformation")
    .addClass("btn btn__large")
    .text("Submit");

  newModal.append(
    xIcon,
    firstNameRow,
    lastNameRow,
    emailRow,
    passswordRow,
    reEnterPassswordRow,
    submitBtn
  );

  $("#modal").append(newModal);

}

$(document).on("click", "#submitUserInformation", postUserInfo);

function postUserInfo(event) {
  event.preventDefault();

  var newUserInfo={
    firstname: $("#inputFirstName").val().trim(),
    lastname: $("#inputlastName").val().trim(),
    email: $("#inputEmail").val().trim(),
    password: $("#inputPassword").val().trim(),
    score: 0,
    active: true
  };

  $.post("/api/users", newUserInfo, function(){
    location.reload();
    
  });
}


//hide the send submit button to request a new password
$("#resetPwd").css("display", "none");
//request a new password
$("#resetPwd").click(function () {
  let email = $("#inputEmail").val().trim();

  $.ajax("/api/users/resetpwd", {
    method: "POST",
    data: { email: email}
  }).then(() => {
    showSuccessMessage("Your new password was sent. Check your inbox in a few minutes!");
  }).catch(err => {
    showErrorMessage(err.responseText);
  });
  
});

$("#forgot-pwd").click(function () {
  event.preventDefault();
  //hide the unecessary fields to request a new password
  hideElement("inputPassword");
  
  //hide sign in and sign up buttons and forgot passowrd link
  hideElement("submitSignIn");
  hideElement("signUP");
  hideElement("forgot-pwd");
  
  //show reset button
  showElement("resetPwd");
  
});
