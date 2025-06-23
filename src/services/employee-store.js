class EmployeeStore {
  constructor() {
    this.employees = this.loadEmployees();
    this.listeners = [];
  }

  loadEmployees() {
    // ISO format: YYYY-MM-DD
    return [
      {
        id: 1,
        firstName: "Test",
        lastName: "Deneme",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "test@test.com",
        department: "Tech",
        position: "Senior",
      },
      {
        id: 2,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 3,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 4,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 5,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 6,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 7,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 8,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 9,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 10,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 11,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
      {
        id: 12,
        firstName: "Ali",
        lastName: "Veli",
        dateOfEmployment: "2025-01-01",
        dateOfBirth: "2020-01-01",
        phoneNumber: "+90 532 111 12 13",
        emailAddress: "ali@veli.com",
        department: "Tech",
        position: "Junior",
      },
    ];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  notify() {
    this.listeners.forEach((callback) => callback(this.employees));
  }

  getEmployees() {
    return [...this.employees];
  }

  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: Math.max(...this.employees.map((e) => e.id), 0) + 1,
    };
    this.employees.push(newEmployee);
    this.notify();
    return newEmployee;
  }

  updateEmployee(id, updates) {
    const index = this.employees.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...updates };
      this.notify();
      return this.employees[index];
    }
    return null;
  }

  deleteEmployee(id) {
    this.employees = this.employees.filter((e) => e.id !== id);
    this.notify();
  }

  getEmployeeById(id) {
    return this.employees.find((e) => e.id === parseInt(id));
  }
}

export const employeeStore = new EmployeeStore();
