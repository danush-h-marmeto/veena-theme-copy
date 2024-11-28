class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.productHandle = this.dataset.productHandle;
    this.sectionId = this.dataset.sectionId;

    // Parse variant data from the embedded script tag
    const scriptTag = this.querySelector("script");
    if (scriptTag) {
      try {
        this.variantData = JSON.parse(scriptTag.textContent);
      } catch (error) {
        console.error("Failed to parse variant data:", error);
      }
    } else {
      console.error("No script tag found for variant data.");
    }

    // Attach event listener for option changes specifically for radio buttons
    this.addEventListener("change", this.handleInputChange.bind(this));
  }

  handleInputChange(event) {
    // Check if the event target is a radio button and skip other inputs
    if (
      event.target.type === "radio" &&
      !event.target.classList.contains("compare-checkbox")
    ) {
      this.onOptionChange();
    }
  }

  onOptionChange() {
    // Collect selected options from radio buttons
    this.selectedOptions = Array.from(
      this.querySelectorAll('input[type="radio"]:checked'),
      (input) => input.value
    );

    // Find the corresponding variant
    this.currentVariant = this.variantData.find(
      (variant) =>
        JSON.stringify(variant.options) === JSON.stringify(this.selectedOptions)
    );

    // Update the card with the new variant
    if (this.currentVariant) {
      this.getUpdatedCard();
    } else {
      console.error(
        "No matching variant found for the selected options:",
        this.selectedOptions
      );
    }
  }

  getUpdatedCard() {
    const url = `/products/${this.productHandle}?variant=${this.currentVariant.id}&section_id=render-product-card`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch product card. Status: ${response.status}`
          );
        }
        return response.text();
      })
      .then((responseText) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(responseText, "text/html");
        const updatedContent = html.querySelector(
          `[data-product-handle="${this.productHandle}"]`
        );

        if (updatedContent) {
          this.innerHTML = updatedContent.innerHTML;

          // Reinitialize the event listeners after updating the content
          this.reinitializeEventListeners();
        } else {
          console.error("Failed to find updated content in the fetched HTML.");
        }
      })
      .catch((error) =>
        console.error("Error fetching updated product card:", error)
      );
  }

  reinitializeEventListeners() {
    // Reattach the event listener for option changes
    this.addEventListener("change", this.handleInputChange.bind(this));
  }
}

// Register the custom element
customElements.define("product-card", ProductCard);
