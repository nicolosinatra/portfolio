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

