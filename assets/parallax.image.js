document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_2",
      start: "0% 0%",
      end: "120% 0%",
      scrub: 1,
      pin: true,
    },
  });

  tl.to(".parallax-item", {
    y: -50,
    opacity: 1,
    duration: 2,
    stagger: 0.5,
  });
});
