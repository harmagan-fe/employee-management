import { employeeStore } from "../services/employee-store.js";
import { router } from "../services/router.js";
import { LitElement, html, css } from "lit";

class EditEmployee extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    id: { type: String },
  };

  constructor() {
    super();
    this.id = "";
  }

  updated(changedProperties) {
    if (changedProperties.has("id") && this.id) {
      const form = this.shadowRoot.querySelector("employee-form");
      if (form) {
        const employee = employeeStore.getEmployeeById(parseInt(this.id));
        if (employee) {
          form.employee = { ...employee };
          form.isEditing = true;
        } else {
          router.navigate("/");
        }
      }
    }
  }

  render() {
    return html`<employee-form></employee-form>`;
  }
}

customElements.define("edit-employee", EditEmployee);
