import { employeeStore } from "../services/employee-store.js";
import { localizationService } from "../services/localization-service.js";
import { router } from "../services/router.js";
import { LitElement, html, css } from "lit";

class EmployeeForm extends LitElement {
  static styles = css`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 24px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .form-error {
      color: #dc3545;
      font-size: 12px;
      margin-top: 4px;
    }

    .btn {
      padding: 10px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    h2 {
      margin-bottom: 24px;
      color: #333;
    }

    form {
      max-width: 600px;
    }

    @media (max-width: 768px) {
      .card {
        padding: 16px;
      }

      .form-control {
        font-size: 16px; /* Prevents zoom on mobile */
      }
    }
  `;

  static properties = {
    employee: { type: Object },
    isEditing: { type: Boolean },
    errors: { type: Object },
  };

  constructor() {
    super();
    this.employee = {
      firstName: "",
      lastName: "",
      dateOfEmployment: "",
      dateOfBirth: "",
      phoneNumber: "",
      emailAddress: "",
      department: "",
      position: "",
    };
    this.isEditing = false;
    this.errors = {};
  }

  render() {
    return html`
      <div class="card">
        <h2>
          ${this.isEditing
            ? localizationService.t("edit")
            : localizationService.t("addEmployee")}
        </h2>
        <form @submit="${this.handleSubmit}">
          <div class="form-group">
            <label>${localizationService.t("firstName")}</label>
            <input
              type="text"
              class="form-control"
              .value="${this.employee.firstName}"
              @input="${(e) => this.updateField("firstName", e.target.value)}"
              required
            />
            ${this.errors.firstName
              ? html`<div class="form-error">${this.errors.firstName}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("lastName")}</label>
            <input
              type="text"
              class="form-control"
              .value="${this.employee.lastName}"
              @input="${(e) => this.updateField("lastName", e.target.value)}"
              required
            />
            ${this.errors.lastName
              ? html`<div class="form-error">${this.errors.lastName}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("dateOfEmployment")}</label>
            <input
              type="date"
              class="form-control"
              .value="${this.employee.dateOfEmployment}"
              @input="${(e) =>
                this.updateField("dateOfEmployment", e.target.value)}"
              required
            />
            ${this.errors.dateOfEmployment
              ? html`<div class="form-error">
                  ${this.errors.dateOfEmployment}
                </div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("dateOfBirth")}</label>
            <input
              type="date"
              class="form-control"
              .value="${this.employee.dateOfBirth}"
              @input="${(e) => this.updateField("dateOfBirth", e.target.value)}"
              required
            />
            ${this.errors.dateOfBirth
              ? html`<div class="form-error">${this.errors.dateOfBirth}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("phoneNumber")}</label>
            <input
              type="tel"
              class="form-control"
              .value="${this.employee.phoneNumber}"
              @input="${(e) => this.updateField("phoneNumber", e.target.value)}"
              required
            />
            ${this.errors.phoneNumber
              ? html`<div class="form-error">${this.errors.phoneNumber}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("emailAddress")}</label>
            <input
              type="email"
              class="form-control"
              .value="${this.employee.emailAddress}"
              @input="${(e) =>
                this.updateField("emailAddress", e.target.value)}"
              required
            />
            ${this.errors.emailAddress
              ? html`<div class="form-error">${this.errors.emailAddress}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("department")}</label>
            <select
              class="form-control"
              .value="${this.employee.department}"
              @change="${(e) => this.updateField("department", e.target.value)}"
              required
            >
              <option value="">Select Department</option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
            ${this.errors.department
              ? html`<div class="form-error">${this.errors.department}</div>`
              : ""}
          </div>

          <div class="form-group">
            <label>${localizationService.t("position")}</label>
            <select
              class="form-control"
              .value="${this.employee.position}"
              @change="${(e) => this.updateField("position", e.target.value)}"
              required
            >
              <option value="">Select Position</option>
              <option value="Junior">Junior</option>
              <option value="Medior">Medior</option>
              <option value="Senior">Senior</option>
            </select>
            ${this.errors.position
              ? html`<div class="form-error">${this.errors.position}</div>`
              : ""}
          </div>

          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button type="submit" class="btn btn-primary">
              ${localizationService.t("save")}
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="${this.handleCancel}"
            >
              ${localizationService.t("cancel")}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  updateField(field, value) {
    this.employee = { ...this.employee, [field]: value };
    if (this.errors[field]) {
      this.errors = { ...this.errors, [field]: null };
    }
  }

  validate() {
    const errors = {};
    if (!this.employee.firstName.trim()) {
      errors.firstName = localizationService.t("required");
    }
    if (!this.employee.lastName.trim()) {
      errors.lastName = localizationService.t("required");
    }
    if (!this.employee.dateOfEmployment) {
      errors.dateOfEmployment = localizationService.t("required");
    }
    if (!this.employee.dateOfBirth) {
      errors.dateOfBirth = localizationService.t("required");
    }
    if (!this.employee.phoneNumber.trim()) {
      errors.phoneNumber = localizationService.t("required");
    }
    if (!this.employee.emailAddress.trim()) {
      errors.emailAddress = localizationService.t("required");
    }
    if (!this.employee.department) {
      errors.department = localizationService.t("required");
    }
    if (!this.employee.position) {
      errors.position = localizationService.t("required");
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validate()) return;

    const confirmMessage = this.isEditing
      ? localizationService.t("confirmUpdate")
      : localizationService.t("confirmAdd");

    if (confirm(confirmMessage)) {
      if (this.isEditing) {
        employeeStore.updateEmployee(this.employee.id, this.employee);
      } else {
        employeeStore.addEmployee(this.employee);
      }
      router.navigate("/");
    }
  }

  handleCancel() {
    router.navigate("/");
  }
}

customElements.define("employee-form", EmployeeForm);
