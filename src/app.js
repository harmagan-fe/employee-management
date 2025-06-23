import "./components/app-navbar.js";
import "./components/employee-list.js";
import "./components/employee-form.js";
import "./components/add-employee.js";
import "./components/edit-employee.js";
import { router } from "./services/router.js";
import { employeeStore } from "./services/employee-store.js";
import { localizationService } from "./services/localization-service.js";

// Define routes
router.addRoute("/", "employee-list");
router.addRoute("/employees", "employee-list");
router.addRoute("/add", "add-employee");
router.addRoute("/edit/:id", "edit-employee");

// Attach to window so test-runner can access
window.employeeStore = employeeStore;
window.localizationService = localizationService;
window.router = router;

// Wait for DOM loaded then render the correct component
document.addEventListener("DOMContentLoaded", () => {
  router.handleRoute();
});
