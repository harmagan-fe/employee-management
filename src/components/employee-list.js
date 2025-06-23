import { LitElement, html, css } from "lit";
import { employeeStore } from "../services/employee-store.js";
import { localizationService } from "../services/localization-service.js";
import { router } from "../services/router.js";
import { utils } from "../utils/utils.js";

class EmployeeList extends LitElement {
  static styles = css`
    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .search-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      gap: 20px;
    }

    .form-control {
      flex: 1;
      max-width: 300px;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .view-toggle {
      display: flex;
      gap: 8px;
    }

    .view-toggle button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .view-toggle button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }

    .table-responsive {
      overflow-x: auto;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .table th,
    .table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .table th {
      background: #f8f9fa;
      font-weight: bold;
    }

    .btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 8px;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-danger {
      background: #dc3545;
      color: white;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }

    .pagination button {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-info {
      color: #666;
      font-size: 14px;
    }

    .no-employees {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .employee-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .employee-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      background: #f8f9fa;
    }

    .employee-card h3 {
      margin: 0 0 12px 0;
      color: #333;
    }

    .info {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 16px;
    }

    .actions {
      display: flex;
      gap: 8px;
    }
  `;

  static properties = {
    employees: { type: Array },
    filteredEmployees: { type: Array },
    searchTerm: { type: String },
    viewMode: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
  };

  constructor() {
    super();
    this.employees = [];
    this.filteredEmployees = [];
    this.searchTerm = "";
    this.viewMode = "table";
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.loadEmployees();
  }

  connectedCallback() {
    super.connectedCallback();
    if (employeeStore && typeof employeeStore.subscribe === "function") {
      this.unsubscribe = employeeStore.subscribe((employees) => {
        this.employees = employees || [];
        this.filterEmployees();
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  async loadEmployees() {
    try {
      if (employeeStore && typeof employeeStore.getEmployees === "function") {
        const employees = await employeeStore.getEmployees();
        this.employees = employees || [];
        this.filterEmployees();
      }
    } catch (error) {
      console.error("Error loading employees:", error);
      this.employees = [];
      this.filterEmployees();
    }
  }

  filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = [...this.employees];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter((emp) => {
        return (
          emp.firstName?.toLowerCase().includes(term) ||
          emp.lastName?.toLowerCase().includes(term) ||
          emp.emailAddress?.toLowerCase().includes(term) ||
          emp.phoneNumber?.toLowerCase().includes(term) ||
          emp.department?.toLowerCase().includes(term) ||
          emp.position?.toLowerCase().includes(term)
        );
      });
    }
    this.currentPage = 1;
    this.requestUpdate();
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  get paginationInfo() {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredEmployees.length
    );
    return `${start}-${end} of ${this.filteredEmployees.length}`;
  }

  render() {
    return html`
      <div class="card">
        <div class="search-bar">
          <input
            type="text"
            class="form-control"
            placeholder="${localizationService.t("search")}"
            .value="${this.searchTerm}"
            @input="${this.handleSearch}"
          />
          <div class="view-toggle">
            <button
              class="${this.viewMode === "table" ? "active" : ""}"
              @click="${() => (this.viewMode = "table")}"
            >
              ${localizationService.t("tableView")}
            </button>
            <button
              class="${this.viewMode === "list" ? "active" : ""}"
              @click="${() => (this.viewMode = "list")}"
            >
              ${localizationService.t("listView")}
            </button>
          </div>
        </div>

        ${this.filteredEmployees.length === 0
          ? html`<div class="no-employees">
              ${this.employees.length === 0
                ? "No employees found. Add some employees to get started."
                : "No employees match your search criteria."}
            </div>`
          : html`
              ${this.viewMode === "table"
                ? this.renderTable()
                : this.renderListView()}
              ${this.renderPagination()}
            `}
      </div>
    `;
  }

  renderTable() {
    return html`
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>${localizationService.t("firstName")}</th>
              <th>${localizationService.t("lastName")}</th>
              <th>${localizationService.t("emailAddress")}</th>
              <th>${localizationService.t("phoneNumber")}</th>
              <th>${localizationService.t("department")}</th>
              <th>${localizationService.t("position")}</th>
              <th>${localizationService.t("dateOfEmployment")}</th>
              <th>${localizationService.t("dateOfBirth")}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.paginatedEmployees.map(
              (employee) => html`
                <tr>
                  <td>${employee.firstName || ""}</td>
                  <td>${employee.lastName || ""}</td>
                  <td>${employee.emailAddress || ""}</td>
                  <td>${employee.phoneNumber || ""}</td>
                  <td>${employee.department || ""}</td>
                  <td>${employee.position || ""}</td>
                  <td>
                    ${utils.formatDateToDotFormat(
                      employee.dateOfEmployment || ""
                    )}
                  </td>
                  <td>
                    ${utils.formatDateToDotFormat(employee.dateOfBirth || "")}
                  </td>
                  <td>
                    <button
                      class="btn btn-secondary"
                      @click="${() => this.editEmployee(employee.id)}"
                    >
                      ${localizationService.t("edit")}
                    </button>
                    <button
                      class="btn btn-danger"
                      @click="${() => this.deleteEmployee(employee.id)}"
                    >
                      ${localizationService.t("delete")}
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }

  renderPagination() {
    if (this.totalPages <= 1) return "";

    return html`
      <div class="pagination">
        <div class="pagination-info">${this.paginationInfo}</div>
        <div>
          <button
            ?disabled="${this.currentPage === 1}"
            @click="${() => this.changePage(this.currentPage - 1)}"
          >
            ${localizationService.t("previous")}
          </button>
          <button
            ?disabled="${this.currentPage === this.totalPages}"
            @click="${() => this.changePage(this.currentPage + 1)}"
          >
            ${localizationService.t("next")}
          </button>
        </div>
      </div>
    `;
  }

  renderListView() {
    return html`
      <div class="employee-list">
        ${this.paginatedEmployees.map(
          (employee) => html`
            <div class="employee-card">
              <h3>${employee.firstName || ""} ${employee.lastName || ""}</h3>
              <div class="info">
                <div>
                  <strong>${localizationService.t("emailAddress")}:</strong>
                  ${employee.emailAddress || ""}
                </div>
                <div>
                  <strong>${localizationService.t("phoneNumber")}:</strong>
                  ${employee.phoneNumber || ""}
                </div>
                <div>
                  <strong>${localizationService.t("department")}:</strong>
                  ${employee.department || ""}
                </div>
                <div>
                  <strong>${localizationService.t("position")}:</strong>
                  ${employee.position || ""}
                </div>
                <div>
                  <strong>${localizationService.t("dateOfEmployment")}:</strong>
                  ${utils.formatDateToDotFormat(
                    employee.dateOfEmployment || ""
                  )}
                </div>
                <div>
                  <strong>${localizationService.t("dateOfBirth")}:</strong>
                  ${utils.formatDateToDotFormat(employee.dateOfBirth || "")}
                </div>
              </div>
              <div class="actions">
                <button
                  class="btn btn-secondary"
                  @click="${() => this.editEmployee(employee.id)}"
                >
                  ${localizationService.t("edit")}
                </button>
                <button
                  class="btn btn-danger"
                  @click="${() => this.deleteEmployee(employee.id)}"
                >
                  ${localizationService.t("delete")}
                </button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }

  handleSearch(e) {
    this.searchTerm = e.target.value;
    this.filterEmployees();
  }

  changePage(page) {
    this.currentPage = page;
  }

  editEmployee(id) {
    if (router && typeof router.navigate === "function") {
      router.navigate(`/edit/${id}`);
    }
  }

  deleteEmployee(id) {
    if (confirm(localizationService.t("confirmDelete"))) {
      if (employeeStore && typeof employeeStore.deleteEmployee === "function") {
        employeeStore.deleteEmployee(id);
      }
    }
  }
}

customElements.define("employee-list", EmployeeList);
export { EmployeeList };
