/**
 * Copyright 2024 C0nn0r1
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `my-dashboard`
 * 
 * @demo index.html
 * @element my-dashboard
 */
export class MyDashboard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "my-dashboard";
  }

  constructor() {
    super();
    this.title = "";
    this.imgUrl = "";
    this.alt = "";
    this.secondaryCreator = "";
    this.imageData = null;

    // Fetch the NASA image on initialization
    this.fetchNasaImage();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      imgUrl: { type: String },
      alt: { type: String },
      secondaryCreator: { type: String },
      imageData: { type: Object }
    };
  }

  // Fetch the NASA image
  async fetchNasaImage() {
    const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    const data = await response.json();
    this.imageData = data;

    // Set the properties with data from the API
    this.imgUrl = data.url;
    this.alt = data.title; // You can set this to any appropriate text
    this.secondaryCreator = data.copyright || "NASA"; // Fallback to "NASA" if copyright is not available

    // Update the component to reflect the new data
    this.requestUpdate();
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
      css`
        :host {
          display: block;
          margin: var(--ddd-spacing-2, 16px);
          padding: var(--ddd-spacing-4, 32px);
          border: 1px solid var(--ddd-theme-border-color, #ccc);
          border-radius: var(--ddd-radius-lg);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        :host(:hover) {
          background-color: var(--ddd-accent-3, #e0e0e0);
        }
        img {
          width: 240px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
      `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <a href="${this.imgUrl}" target="_blank" rel="noopener noreferrer">
          <img src="${this.imgUrl}" alt="${this.alt}" />
        </a>
        <p>Creator: ${this.secondaryCreator}</p>
      </div>
    `;
  }
}

globalThis.customElements.define(MyDashboard.tag, MyDashboard);
