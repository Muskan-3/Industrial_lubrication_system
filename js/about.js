const interactiveCards = document.querySelectorAll(
  ".metric-card, .story-panel, .process-grid article, .about-logo-ring"
);

interactiveCards.forEach((item) => {
  item.classList.add("about-interactive");

  item.addEventListener("mousemove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 6;
    const rotateX = (0.5 - y) * 6;

    item.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    item.style.boxShadow = "0 14px 30px rgba(14, 22, 34, 0.18)";
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    item.style.boxShadow = "";
  });
});

const revealTargets = document.querySelectorAll(
  ".about-hero-grid, .metric-card, .story-panel, .process-grid article"
);

if ("IntersectionObserver" in window && revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("about-inview");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => {
    target.style.opacity = "0";
    observer.observe(target);
  });
}
