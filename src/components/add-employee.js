import { LitElement, html, css } from "lit";

class AddEmployee extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`<employee-form></employee-form>`;
  }
}

customElements.define("add-employee", AddEmployee);
