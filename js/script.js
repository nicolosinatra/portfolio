/* Evento caricamento pagina vuoto */
$( document ).ready(function() {
	document.querySelectorAll('.contact-info p').forEach(function(p) {
    p.setAttribute('data-marquee', p.textContent);
  });
});

/* Scrollare la pagina fino all'inizio con click */
$(".backtotop").click(function() {
  $("html").animate({ scrollTop: 0 }, "slow");
});

$(".plus-icon").on("click", function() {
  $(this).toggleClass("active");
});

$(document).ready(function () {
  $("#menuToggle").on("click", function () {
    $("#voci-menu").toggleClass("open");
    if ($("#voci-menu").hasClass("open")) {
      // mostra con cascata: ritardo progressivo per ogni voce
      $("#voci-menu .voce-menu").each(function (i) {
        const delay = i * 0.1; // seconds
        $(this).css({
          "transition-delay": delay + "s"
        });
      });
    } else {
      // reset
      $("#voci-menu .voce-menu").css({
        "transition-delay": "0.15s"
      });
    }
  });
});


$(document).ready(function () {
    $(".slider-container").each(function () {
      const $container = $(this);
      const $slider = $container.find(".slider");
      const $slides = $container.find(".slides");
      const $images = $container.find(".slides img");
      const $prevBtn = $container.find(".prev");
      const $nextBtn = $container.find(".next");

      let index = 0;

      function updateSlider() {
        const slideWidth = $slider.width();
        $slides.css("transform", `translateX(-${index * slideWidth}px)`);
      }

      function nextSlide() {
        index = (index + 1) % $images.length;
        updateSlider();
      }

      function prevSlide() {
        index = (index - 1 + $images.length) % $images.length;
        updateSlider();
      }

      $nextBtn.on("click", nextSlide);
      $prevBtn.on("click", prevSlide);

      // Aggiorna posizione quando si ridimensiona
      $(window).on("resize", updateSlider);
    });
  
  });