document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.contact-info p').forEach(function(p) {
    p.setAttribute('data-marquee', p.textContent);
  });
});

    