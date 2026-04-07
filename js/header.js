const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
const topbar = document.querySelector(".topbar");

if (topbar) {
  const updateTopbarState = () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
  };

  updateTopbarState();
  window.addEventListener("scroll", updateTopbarState, { passive: true });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
