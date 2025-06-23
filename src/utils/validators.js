export const validators = {
  required: (value) => {
    return value && value.toString().trim() !== "";
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  phone: (value) => {
    const phoneRegex = /^[+]?[\d\s\-()]+$/;
    return phoneRegex.test(value);
  },

  minLength: (value, length) => {
    return value && value.length >= length;
  },

  maxLength: (value, length) => {
    return !value || value.length <= length;
  },

  validateEmployee: (employee, employeeStore, excludeId = null) => {
    const errors = {};

    // Required field validation
    if (!validators.required(employee.firstName)) {
      errors.firstName = "required";
    }
    if (!validators.required(employee.lastName)) {
      errors.lastName = "required";
    }
    if (!validators.required(employee.dateOfEmployment)) {
      errors.dateOfEmployment = "required";
    }
    if (!validators.required(employee.dateOfBirth)) {
      errors.dateOfBirth = "required";
    }
    if (!validators.required(employee.phoneNumber)) {
      errors.phoneNumber = "required";
    }
    if (!validators.required(employee.emailAddress)) {
      errors.emailAddress = "required";
    }
    if (!validators.required(employee.department)) {
      errors.department = "required";
    }
    if (!validators.required(employee.position)) {
      errors.position = "required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
