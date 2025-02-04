export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export interface DashboardUser {
  name: string;
}

export interface CardProps {
  title: string;
  count?: number;
  color?: string;
  route?: string;
}

export interface ButtonCreateOrderProps {
  route: string;
}

export interface ItemsProps {
  id: number;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
}

export interface FormData {
  name: string;
  category: string;
  price: string;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}