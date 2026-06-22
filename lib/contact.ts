interface ContactValues {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function validateContact(values: ContactValues): Partial<Record<keyof ContactValues, string>> {
  const errors: Partial<Record<keyof ContactValues, string>> = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Tell us your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = "Share at least 20 characters about the project.";
  }

  return errors;
}
