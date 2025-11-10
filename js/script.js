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

// Sticky anni-progetti-menu con supporto a scroll interno
$(document).ready(function () {

  function getFirstTop() {
    if ($(window).width() >= 1024) return 55;
    if ($(window).width() >= 600) return 53;
    return 47;
  }

  const $anniProgettiMenu = $(".anni-progetti-menu");
  const offsets = [];
  let headerHeight = 0;

  // ritorna il container di scroll attivo (window oppure elemento interno .main-index-progetti)
  function getScrollContainer() {
    return $('body').hasClass('use-inner-scroll') ? $('.main-index-progetti') : $(window);
  }

 // calcola offsets relativi al container scelto
  function computeOffsets($container) {
    offsets.length = 0;
    $anniProgettiMenu.each(function(i, h) {
      const $h = $(h);
      let top;
      if ($container.length && $container[0] !== window) {
        // posizione relativa allo scroll interno: offset dell'elemento dentro il container + scrollTop del container
        top = $h.offset().top - $container.offset().top + $container.scrollTop();
      } else {
        top = $h.offset().top;
      }
      // arrotondo per maggiore stabilità su mobile
      offsets.push({ el: h, top: Math.round(top), index: i });
    });
    headerHeight = $($anniProgettiMenu[0]).outerHeight(true) || 0;
  }

  // handler principale che usa il container di scroll corrente
  function createScrollHandler($container) {
    return function() {
      const scrollY = ($container[0] === window) ? $(window).scrollTop() : $container.scrollTop();
      let fixedCount = 0;

      offsets.forEach(function(item) {
        const $el = $(item.el);
        const topCumulative = fixedCount === 0 ? getFirstTop() : getFirstTop() + fixedCount * headerHeight;

        // confronto corretto: non sottrarre due volte headerHeight
        if ((scrollY > 100) && (scrollY >= item.top - topCumulative)) {
          $el.addClass("fixed").css({ top: topCumulative + "px" });
          fixedCount++;
        } else {
          $el.removeClass("fixed").css({ top: "" });
        }
      });
    };
  }

  let $currentContainer = getScrollContainer();
  let scrollHandler = null;

  function attach() {
    // rimuovo handler precedente
    if ($currentContainer) $currentContainer.off('.stickyProgetti');
    // aggiorno container e offsets
    $currentContainer = getScrollContainer();
    computeOffsets($currentContainer);
    // creo e attacco
    scrollHandler = createScrollHandler($currentContainer);
    $currentContainer.on('scroll.stickyProgetti', scrollHandler);
    // trigger iniziale per posizionare correttamente
    scrollHandler();
  }

  // ricalcola on resize e riattacca
  $(window).on('resize.stickyProgetti', function() {
    // ricalcolo offsets rispetto al container corrente
    computeOffsets($currentContainer);
    if (scrollHandler) scrollHandler();
  });

  // osserva cambi di classe su body (utile quando enableNoScrollIfMobile aggiunge/rimuove .use-inner-scroll)
  const mo = new MutationObserver(function(muts) {
    muts.forEach(function(m) {
      if (m.attributeName === 'class') {
        // riattacca se cambia il container di scroll
        const newContainer = getScrollContainer();
        if (newContainer[0] !== $currentContainer[0]) attach();
      }
    });
  });
  mo.observe(document.body, { attributes: true });

  // inizializza
  attach();

  // gestione click (smooth scroll) rimane identica
  $anniProgettiMenu.on("click", function() {
    const targetId = $(this).data("target");
    if (targetId) {
      let totalStickyHeight = 0;
      $(".anni-progetti-menu.fixed").each(function() {
        totalStickyHeight += $(this).outerHeight(true);
      });

      // se il container è interno, scrolliamo quel container; altrimenti la finestra
      if ($currentContainer[0] === window) {
        const targetOffset = $("#" + targetId).offset().top - totalStickyHeight - 15;
        $("html, body").animate({ scrollTop: targetOffset }, 500);
      } else {
        const targetOffset = $("#" + targetId).offset().top - $currentContainer.offset().top - totalStickyHeight + $currentContainer.scrollTop() - 15;
        $currentContainer.animate({ scrollTop: targetOffset }, 500);
      }
    }
    $(this).removeClass("fixed").css({ top: "" });
  });

});
// ...existing code...


const page = document.body.dataset.page || '';

// controlla se un elemento è scrollabile verticalmente
function isElementScrollable(el) {
  if (!el || el === document.documentElement) return false;
  const style = window.getComputedStyle(el);
  const overflowY = style.overflowY;
  const canScroll = el.scrollHeight > el.clientHeight;
  const isOverflowAuto = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay');
  return canScroll && isOverflowAuto;
}

function isTouchInsideScrollable(e) {
  let node = e.target;
  while (node && node !== document.documentElement) {
    if (node.classList && node.classList.contains('main-index-progetti')) return true;
    if (isElementScrollable(node)) return true;
    node = node.parentNode;
  }
  return false;
}

/* listener che permette scroll dentro elementi scrollabili (.main-index-progetti ecc.)
   e blocca il resto */
function blockAllowInner(e) {
  if (isTouchInsideScrollable(e)) return;
  e.preventDefault();
}

/* listener che blocca TUTTO */
function blockAll(e) {
  e.preventDefault();
}

function isiOS() {
  return /iP(hone|od|ad)/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

let _touchListenerAttached = false;
let _touchMode = null; // 'inner' | 'block' | null

function enableNoScrollIfMobile() {
  // regole: su iOS mobile attiva comportamento; sulle altre piattaforme non intervenire
  const isMobileIOS = isiOS() && window.innerWidth < 1024; // adatta breakpoint se serve

  // scegli la modalità desiderata per la pagina
  // progetti-index -> modalità "inner" (scroll dentro .main-index-progetti)
  // index, about -> modalità "block" (nessuno scroll)
  let desiredMode = null;
  if (!isMobileIOS) {
    desiredMode = null;
  } else if (page === "progetti-index" || page === "index-progetti") {
    desiredMode = 'inner';
  } else if (page === "home" || page === "about") {
    desiredMode = 'block';
  } else {
    desiredMode = null;
  }

  // niente da fare se già nello stato voluto
  if (desiredMode === _touchMode) return;

  // rimuovi stato precedente
  if (_touchListenerAttached) {
    document.removeEventListener('touchmove', _touchMode === 'block' ? blockAll : blockAllowInner, { passive: false });
    document.body.classList.remove('use-inner-scroll');
    _touchListenerAttached = false;
    _touchMode = null;
  }

  // applica nuovo stato
  if (desiredMode === 'inner') {
    document.body.classList.add('use-inner-scroll'); // CSS rende .main-index-progetti scrollabile
    document.addEventListener('touchmove', blockAllowInner, { passive: false });
    _touchListenerAttached = true;
    _touchMode = 'inner';
  } else if (desiredMode === 'block') {
    // blocca tutto (utile per home/about)
    document.addEventListener('touchmove', blockAll, { passive: false });
    _touchListenerAttached = true;
    _touchMode = 'block';
  } else {
    // nessuna azione su dispositivi non iOS o viewport ampie
    _touchMode = null;
  }
}

enableNoScrollIfMobile();
window.addEventListener("resize", enableNoScrollIfMobile);


function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}
window.addEventListener('resize', setAppHeight);
setAppHeight();


    
function setAppHeight() {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
}

window.addEventListener('resize', setAppHeight);
setAppHeight();