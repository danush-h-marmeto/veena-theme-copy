class SplideSlider extends HTMLElement {
  constructor() {
    super();
    this.splideElement = this.querySelector(".splide");
    this.options = JSON.parse(this.splideElement.dataset.sliderSettings);
    console.log(this.options)
    this.mountSplider();
  }

  mountSplider() {
    new Splide(this.splideElement, this.options).mount();
  }
}

customElements.define("slide-slider", SplideSlider);
