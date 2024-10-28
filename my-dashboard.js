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
    this.title = "NASA Image Search";
    this.query = "";
    this.loading = false;
    this.items = [];
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      query: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array }
    };
  }

  async fetchNasaImages(query) {
    this.loading = true;
    const response = await fetch(`https://images-api.nasa.gov/search?media_type=image&q=${query}`);
    const data = await response.json();
    if (data.collection) {
      this.items = data.collection.items;
    }
    this.loading = false;
  }

  handleInputChange(e) {
    this.query = e.target.value;
  }

  updated(changedProperties) {
    if (changedProperties.has('query') && this.query) {
      this.fetchNasaImages(this.query);
    }
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
      css`
        :host {
          display: block;
          padding: 16px;
        }
        input {
          font-size: 20px;
          padding: 8px;
          width: 100%;
        }
        .results {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }
        img {
          width: 100%;
          height: auto;
        }
      `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <input
          type="text"
          placeholder="Search NASA images"
          @input="${this.handleInputChange}"
        />

        <div class="results">
          ${this.loading ? html`<p>Loading...</p>` : ""}
          ${this.items.map(
            (item) => html`
              <div>
                <a href="${item.links[0].href}" target="_blank">
                  <img src="${item.links[0].href}" alt="${item.data[0].title}" />
                </a>
                <p>${item.data[0].title}</p>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

globalThis.customElements.define(MyDashboard.tag, MyDashboard);
  
