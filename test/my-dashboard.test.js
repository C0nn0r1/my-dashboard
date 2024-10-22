import { html, fixture, expect } from '@open-wc/testing';
import "../my-dashboard.js";

describe("myDashboard test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <my-dashboard
        title="title"
      ></my-dashboard>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
