$( document ).ready(function() {
    
ScrollSmoother.create({
  content: ".viewport",
  smooth: 3
});

$(".js-hamburger-menu").click(function(){
  $(".header-menu").toggleClass("active");
  $(".hamburger").toggleClass("active");
});


$('.accordion-item').on('shown.bs.collapse', function () {
  ScrollTrigger.refresh();
}).on('hidden.bs.collapse', function() {
  ScrollTrigger.refresh();
});

});

