export interface RegistrationFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
export interface DashboardUser {
  email: string;
}

export interface CardProps {
  title: string;
  count: number;
  color?: string;
}