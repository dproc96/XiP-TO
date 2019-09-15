$(document).on("click", "#sign-in", function() {
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


function makeNewModal(event) {
  event.preventDefault();

  $("#modal").empty();

  let newModal = $("<modal>").addClass("modal");

  let xIcon = $("<i>")
    .attr("id", "close-modal")
    .addClass("fas fa-times btn-close");
  let firstNameRow = $("<input>").attr({
    type: "text",
    id: "inputFirstName",
    placeholder: "First Name",
    required: "true"
  });
  let lastNameRow = $("<input>").attr({
    type: "text",
    id: "inputlastName",
    placeholder: "Last Name",
    required: "true"
  });

  let emailRow = $("<input>").attr({
    type: "email",
    id: "inputEmail",
    placeholder: "Email Address",
    required: "true",
    autofocus: "true"
  });
  let passswordRow = $("<input>").attr({
    type: "text",
    id: "inputPassword",
    placeholder: "Password",
    required: "true"
  });
  let reEnterPassswordRow = $("<input>").attr({
    type: "text",
    id: "reinputPassword",
    placeholder: "ReEnter Password",
    required: "true"
  });

  let submitBtn = $("<a>")
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
  
  if (newUserInfo.password === $("#reenterSignUpPassword").val()) {
    $.post("/api/users", newUserInfo, function(){
      location.reload();
    });
  }
}


