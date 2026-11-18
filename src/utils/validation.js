/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).trim());
};

/**
 * Validate an Indian phone number.
 * Accepts optional +91 / 0 prefix, optional spaces/dashes, 10-digit number.
 * @param {string} phone
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  const regex = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;
  return regex.test(String(phone).replace(/[\s-]/g, ''));
};

/**
 * Validate the entire contact form.
 * @param {{ name: string, email: string, phone: string, service: string, message: string }} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateContactForm = (data) => {
  const errors = {};

  // Name
  if (!data.name || !data.name.trim()) {
    errors.name = 'Name is required.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  // Email
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  // Phone
  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid Indian phone number.';
  }

  // Service
  if (!data.service || !data.service.trim()) {
    errors.service = 'Please select a service.';
  }

  // Message
  if (!data.message || !data.message.trim()) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
