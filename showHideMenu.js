document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger.js-hamburger-menu");
  const hamburgerClose = document.querySelector(".hamburger.close.js-hamburger-menu");
  const hoverZone = document.getElementById("right-hover-zone");
  const landingSection = document.querySelector("#TemplateLayer");

  let isPastLanding = false;
  let hoverTimeout;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isPastLanding = !entry.isIntersecting;
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

  // Make hover zone transparent to pointer events but still detect hover
  if (hoverZone) {
    hoverZone.style.pointerEvents = 'none';
  }

  // Create a container that wraps both hamburger and hover zone
  const hamburgerContainer = document.createElement('div');
  hamburgerContainer.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 60px;
    z-index: 1000;
    pointer-events: none;
  `;

  // Insert container and move hamburger into it
  hamburger.parentNode.insertBefore(hamburgerContainer, hamburger);
  hamburgerContainer.appendChild(hamburger);
  if (hamburgerClose) {
    hamburgerContainer.appendChild(hamburgerClose);
  }

  // Make hamburger clickable
  hamburger.style.pointerEvents = 'auto';
  if (hamburgerClose) {
    hamburgerClose.style.pointerEvents = 'auto';
  }

  // Add hover detection to the container
  hamburgerContainer.addEventListener("mouseenter", () => {
    clearTimeout(hoverTimeout);
    if (isPastLanding) {
      hamburger.classList.remove("hidden-opacity");
      if (hamburgerClose) {
        hamburgerClose.classList.remove("hidden-opacity");
      }
    }
  });

  hamburgerContainer.addEventListener("mouseleave", () => {
    if (isPastLanding) {
      // Add a small delay to prevent flickering
      hoverTimeout = setTimeout(() => {
        hamburger.classList.add("hidden-opacity");
        if (hamburgerClose) {
          hamburgerClose.classList.add("hidden-opacity");
        }
      }, 100);
    }
  });

  function updateHamburgerVisibilityOnScroll(pastLanding) {
    clearTimeout(hoverTimeout);
    
    if (pastLanding) {
      // If past landing, initially hide (will show on hover)
      hamburger.classList.add("hidden-opacity");
      if (hamburgerClose) {
        hamburgerClose.classList.add("hidden-opacity");
      }
    } else {
      // If on landing section, show the hamburger
      hamburger.classList.remove("hidden-opacity");
      if (hamburgerClose) {
        hamburgerClose.classList.remove("hidden-opacity");
      }
    }
  }

  // Initial state on load
  const initialCheck = landingSection ? 
    landingSection.getBoundingClientRect().bottom <= 0 : false;
  updateHamburgerVisibilityOnScroll(initialCheck);
});