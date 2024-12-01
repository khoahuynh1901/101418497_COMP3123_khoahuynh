const stringRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name, value) => {
  let error = '';

  switch (name) {
    case 'first_name':
    case 'last_name':
    case 'position':
    case 'department':
      if (!stringRegex.test(value)) {
        error = 'This field can only contain letters and spaces.';
      }
      break;
    case 'email':
      if (!emailRegex.test(value)) {
        error = 'Invalid email format.';
      }
      break;
    case 'salary':
      if (value && isNaN(value)) {
        error = 'Salary must be a numeric value.';
      }
      break;
    default:
      break;
  }

  return error;
};

export const validateForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      errors[key] = error;
    }
  });

  return errors;
};
