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



    