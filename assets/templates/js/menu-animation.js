$(document).ready(function() {
    // Register the MorphSVG plugin
    gsap.registerPlugin(MorphSVGPlugin);
    
    // Initialize main timeline
    const menuTl = gsap.timeline({ paused: true });
    
    // Define the blob paths
    const blobClosedPath = "M100,0 C60,200 60,400 100,600";
    const blobOpenPath = "M0,0 C40,200 40,400 0,600";
    
    // Setup the menu animation
    menuTl
        // Animate the blob
        .to("#menu-blob-path", {
            attr: { d: blobOpenPath },
            duration: 0.6,
            ease: "power2.inOut"
        }, 0)
        
        // Animate the hamburger to X
        .to("#line1", {
            top: "9px",
            rotation: 45,
            backgroundColor: "#000",
            duration: 0.4,
            ease: "power2.inOut"
        }, 0.1)
        .to("#line2", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut"
        }, 0.1)
        .to("#line3", {
            top: "9px",
            rotation: -45,
            backgroundColor: "#000",
            duration: 0.4,
            ease: "power2.inOut"
        }, 0.1)
        
        // Stagger the menu items
        .to(".menu-item a", {
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        }, 0.3)
        
        // Animate the social links
        .to(".menu-social", {
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, 0.6);
    
    // Toggle menu
    $(".js-hamburger-menu").click(function(e) {
        e.preventDefault();
        $(".header-menu").toggleClass("active");
        
        if ($(".header-menu").hasClass("active")) {
            menuTl.play();
        } else {
            menuTl.reverse();
        }
    });
    
    // Initialize menu items position
    gsap.set(".menu-item a", { y: "100%" });
    gsap.set(".menu-social", { y: "100%" });
});