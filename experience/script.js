
  // When the document is fully loaded
  document.addEventListener("DOMContentLoaded", function () {

    // Get the menu button and navbar
    const menu = document.getElementById('menu');
    const navbar = document.querySelector('.navbar');

    // Toggle menu icon and navbar on click
    menu.addEventListener('click', function () {
      this.classList.toggle('fa-times');       // Toggle menu icon
      navbar.classList.toggle('nav-toggle');   // Toggle navbar visibility
    });

    // Handle scroll and page load events
    window.addEventListener('scroll', onScrollOrLoad);
    window.addEventListener('load', onScrollOrLoad);

    function onScrollOrLoad() {
      // Reset menu icon and navbar state on scroll/load
      menu.classList.remove('fa-times');
      navbar.classList.remove('nav-toggle');

      // Show or hide scroll-to-top button based on scroll position
      const scrollTopBtn = document.querySelector('#scroll-top');
      if (window.scrollY > 60) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    }

  });

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
  });

  /* SCROLL EXPERIENCE */
  srtop.reveal('.experience .timeline', { delay: 400 });
  srtop.reveal('.experience .timeline .container', { interval: 400 });

  // Change page title and favicon based on visibility state
  document.addEventListener('visibilitychange', function () {
    const favicon = document.getElementById("favicon");
    if (document.visibilityState === "visible") {
      document.title = "Experience | Portfolio ibrahim bin burikan";
      if (favicon) favicon.setAttribute("href", "/assets/images/favicon.png");
    } else {
      document.title = "Come Back To Portfolio";
      if (favicon) favicon.setAttribute("href", "/assets/images/favhand.png");
    }
  });
