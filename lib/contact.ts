export interface ContactValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = "Tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 20) errors.message = "Share at least 20 characters about the project.";
  return errors;
}
