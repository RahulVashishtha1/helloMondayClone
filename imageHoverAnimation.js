import gsap from 'gsap';

document.querySelectorAll('.card-service-img').forEach(imgContainer => {
  const img = imgContainer.querySelector('img');

  imgContainer.addEventListener('mouseenter', () => {
    gsap.to(img, { scaleX: 1.1, duration: 0.3, ease: 'power2.out' }); // Scale out horizontally
  });

  imgContainer.addEventListener('mouseleave', () => {
    gsap.to(img, { scaleX: 1, duration: 0.3, ease: 'power2.in' }); // Scale back to normal
  });
});