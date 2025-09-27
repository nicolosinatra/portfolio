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

$(document).ready(function () {

  function getFirstTop() {
    if ($(window).width() >= 1024) return 55;
    if ($(window).width() >= 600) return 53;
    return 47;
  }

  const $anniProgettiMenu = $(".anni-progetti-menu");
  const offsets = [];

  // calcolo posizioni e altezza
  $anniProgettiMenu.each(function(i, h) {
    offsets.push({
      el: h,
      top: $(h).offset().top,
      index: i,
    });
  });

  const headerHeight = $($anniProgettiMenu[0]).outerHeight(true);

  // scroll
  $(window).on("scroll", function() {
    const scrollY = $(window).scrollTop();
    let fixedCount = 0; // fixedCount → tiene conto di quanti titoli sono già stati fissati in alto

    offsets.forEach(function(item) {
      const $el = $(item.el);

      const topCumulative = fixedCount === 0 ? getFirstTop() : getFirstTop() + fixedCount * headerHeight;

      console.log("topCumulative: " + topCumulative + "fixedCount: " + fixedCount)
      console.log("scorllY: " + scrollY + " item.top: " + item.top);


      if ((scrollY > 100)&&(scrollY >= item.top - topCumulative - fixedCount * headerHeight)) {
        $el.addClass("fixed").css({ top: topCumulative + "px" });
        fixedCount++;
      } else {
        $el.removeClass("fixed").css({ top: "" });
      }
    });
  });

  // resize
  $(window).on("resize", function() {
    // qui puoi ricalcolare gli offsets se necessario
    offsets.forEach(function(item) {
      item.top = $(item.el).offset().top;
    });
    $(window).trigger("scroll"); // aggiorna subito le posizioni
  });

  // smooth scroll
  $anniProgettiMenu.on("click", function() {
    const targetId = $(this).data("target");
    if (targetId) {
      // Altezza cumulativa dei titoli sticky attuali
      let totalStickyHeight = 0;

      $(".anni-progetti-menu.fixed").each(function() {
        totalStickyHeight += $(this).outerHeight(true);
      });

      const targetOffset = $("#" + targetId).offset().top - totalStickyHeight- 15; // -5px extra per margine
      $("html, body").animate({ scrollTop: targetOffset }, 500);
    }
    $(this).removeClass("fixed").css({ top: "" });
  });

});


const page = document.body.dataset.page;

function blockScroll(e) {
  e.preventDefault();
}

function enableNoScrollIfMobile() {
  if (page === "about" && window.innerWidth < 600) {
    document.addEventListener("touchmove", blockScroll, { passive: false });
  } else {
    document.removeEventListener("touchmove", blockScroll, { passive: false });
  }
}

enableNoScrollIfMobile();
window.addEventListener("resize", enableNoScrollIfMobile);



    
function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', setAppHeight);
setAppHeight();