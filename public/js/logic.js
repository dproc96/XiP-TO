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
  nextArrow: "<button type='button' data-role='none' class='slick-next slick-arrow' aria-label='Next' role='button' style='display: block;'>Next</button>",
  prevArrow: "<button type='button' data-role='none' class='slick-prev slick-arrow' aria-label='Next' role='button' style='display: block;'>Next</button>"
});

