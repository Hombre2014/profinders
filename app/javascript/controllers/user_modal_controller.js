import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="user-modal"
export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus! I am connected.");
  }

  initialize() {
    this.element.setAttribute("data-action", "click->user-#showModal");
  }

  showModal() {
    event.preventDefault();
    this.url = this.element.getAttribute("href");

    fetch(this.url, {
      headers: {
        Accept: { "text/vnd.turbo-stream.html" },
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": document.querySelector("meta[name=csrf-token]").content,
      }
  })
    .then((response) => response.text())
    .then((html => Turbo.renderStreamMessage(html)))
  }
}
