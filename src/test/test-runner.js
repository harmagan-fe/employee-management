class TestRunner {
  constructor() {
    this.results = [];
  }

  describe(title, callback) {
    console.group(`\n ${title}`);
    try {
      callback();
    } catch (e) {
      console.error("❌ Error in describe block:", e.message);
    }
    console.groupEnd();
  }

  it(name, fn) {
    try {
      fn();
      this.results.push({ name, passed: true });
      console.log(`✅ ${name}`);
    } catch (e) {
      this.results.push({ name, passed: false, message: e.message });
      console.error(`❌ ${name}: ${e.message}`);
    }
  }

  expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, got ${actual}`);
        }
      },
      toBeTruthy() {
        if (!actual) {
          throw new Error(`Expected truthy, got ${actual}`);
        }
      },
      toBeFalsy() {
        if (actual) {
          throw new Error(`Expected falsy, got ${actual}`);
        }
      },
      toContain(expected) {
        if (!actual.includes(expected)) {
          throw new Error(`Expected to contain ${expected}`);
        }
      },
      toBeGreaterThan(expected) {
        if (actual <= expected) {
          throw new Error(`Expected ${actual} to be greater than ${expected}`);
        }
      },
      toEqual(expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          throw new Error(
            `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(
              actual
            )}`
          );
        }
      },
    };
  }

  summary() {
    const total = this.results.length;
    const passed = this.results.filter((r) => r.passed).length;
    const failed = total - passed;
    const percent = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;

    console.log(`\n=== Test Summary ===`);
    console.log(`Total: ${total}, ✅ Passed: ${passed}, ❌ Failed: ${failed}`);
    console.log(`Coverage: ${percent}%`);
  }
}

setTimeout(() => {
  const test = new TestRunner();
  const store = window.employeeStore;
  const localize = window.localizationService;
  const router = window.router;

  // Employee Store Tests
  test.describe("Employee Store - CRUD Operations", () => {
    test.it("should return array of employees", () => {
      const employees = store.getEmployees();
      test.expect(Array.isArray(employees)).toBeTruthy();
    });

    test.it("should add employee with auto-generated ID", () => {
      const initialCount = store.getEmployees().length;
      const newEmployee = {
        firstName: "Ayse",
        lastName: "Fatma",
        emailAddress: "ayse@fatma.com",
        phoneNumber: "+90 555 123 4567",
        department: "Analytics",
        position: "Senior",
        dateOfBirth: "1990-01-01",
        dateOfEmployment: "2024-01-01",
      };

      const added = store.addEmployee(newEmployee);
      test.expect(store.getEmployees().length).toBe(initialCount + 1);
      test.expect(added.id).toBeTruthy();

      // Cleanup
      store.deleteEmployee(added.id);
    });

    test.it("should update existing employee", () => {
      const employee = store.addEmployee({
        firstName: "Test",
        lastName: "User",
        emailAddress: "test@update.com",
        phoneNumber: "+90 111 222 3333",
        department: "tech",
        position: "Junior",
        dateOfBirth: "1993-01-01",
        dateOfEmployment: "2024-01-01",
      });

      const updated = store.updateEmployee(employee.id, {
        firstName: "Updated",
      });
      test.expect(updated.firstName).toBe("Updated");

      store.deleteEmployee(employee.id);
    });

    test.it("should delete employee", () => {
      const employee = store.addEmployee({
        firstName: "Delete",
        lastName: "Me",
        emailAddress: "delete@test.com",
        phoneNumber: "+90 555 111 2222",
        department: "Analytics",
        position: "medior",
        dateOfBirth: "1988-01-01",
        dateOfEmployment: "2024-01-01",
      });

      const beforeDelete = store.getEmployees().length;
      store.deleteEmployee(employee.id);
      test.expect(store.getEmployees().length).toBe(beforeDelete - 1);
    });
  });

  // Localization Tests
  test.describe("Localization Service", () => {
    test.it("should switch to Turkish", () => {
      localize.setLanguage("tr");
      test.expect(localize.currentLang).toBe("tr");
      test.expect(localize.t("employees")).toBe("Çalışanlar");
    });

    test.it("should switch to English", () => {
      localize.setLanguage("en");
      test.expect(localize.currentLang).toBe("en");
      test.expect(localize.t("employees")).toBe("Employees");
    });

    test.it("should fallback for missing keys", () => {
      const result = localize.t("nonExistentKey");
      test.expect(typeof result).toBe("string");
    });
  });

  // Router Tests - Basic functionality
  test.describe("Router Service", () => {
    test.it("should handle route registration", () => {
      router.addRoute("/test", "test-component");
      test.expect(router.routes.has("/test")).toBeTruthy();
    });

    test.it("should get current path", () => {
      const path = router.getCurrentPath();
      test.expect(typeof path).toBe("string");
    });
  });

  // Component Tests
  test.describe("Component Registration", () => {
    test.it("should register employee-form component", () => {
      test.expect(customElements.get("employee-form")).toBeTruthy();
    });

    test.it("should register employee-list component", () => {
      test.expect(customElements.get("employee-list")).toBeTruthy();
    });

    test.it("should register app-navbar component", () => {
      test.expect(customElements.get("app-navbar")).toBeTruthy();
    });
  });

  test.summary();
}, 1000);
