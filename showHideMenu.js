document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger.js-hamburger-menu");
  const hoverZone = document.getElementById("right-hover-zone");
  const landingSection = document.querySelector("#TemplateLayer");

  let isPastLanding = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isPastLanding = !entry.isIntersecting;
      // We don't need to call updateHamburgerVisibility here anymore for the scroll
      updateHamburgerVisibilityOnScroll(isPastLanding);
    },
    {
      root: null,
      threshold: 0,
    }
  );

  if (landingSection) {
    observer.observe(landingSection);
  }

  hoverZone.addEventListener("mouseenter", () => {
    // Always show on hover if we've passed the landing section
    if (isPastLanding) {
      hamburger.classList.remove("hidden-opacity");
    }
  });

  hoverZone.addEventListener("mouseleave", () => {
    // Re-hide if we are past the landing section and not hovering
    if (isPastLanding) {
      hamburger.classList.add("hidden-opacity");
    }
  });

  function updateHamburgerVisibilityOnScroll(pastLanding) {
    if (pastLanding) {
      // If past landing, initially hide (will show on hover)
      hamburger.classList.add("hidden-opacity");
    } else {
      // If on landing section, show the hamburger
      hamburger.classList.remove("hidden-opacity");
    }
  }

  // Initial state on load
  updateHamburgerVisibilityOnScroll(!landingSection || !observer.takeRecords().some(record => record.isIntersecting));
});