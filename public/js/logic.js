$(document).on("click", "#sign-in", function() {
  $("#overlay").attr("class", "overlay");
  $("#modal").attr("class", "modal");
});

$(document).on("click", "#close-modal", function () {
  $("#overlay").attr("class", "overlay hidden");
  $("#modal").attr("class", "modal hidden");
});

$(document).on("click", "#menu", function () {
  let nav = $("#nav");
  if (nav.attr("class") === "desktop-only") {
    nav.attr("class", "");
  }
  else {
    nav.attr("class", "desktop-only");
  }
});