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
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
}

export interface OrderItem extends MenuItem {
  quantity: number;
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

export interface OrderItem {
    id: number;
    itemId: number;
    quantity: number;
    price: number;
    name: string;
}

export interface Order {
    id?: number;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'completed';
    createdAt?: Date;
    subtotal: number;
    tax: number;
}

export interface CompletedOrderItem {
    name: string;
    price: string;
    quantity: number;
    subtotal: string;
}

export interface CompletedOrders {
    id: number;
    subtotal: string;
    tax: string;
    total_amount: string;
    status: string;
    created_at: string;
    items: CompletedOrderItem[];
}