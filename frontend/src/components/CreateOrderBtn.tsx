import { useNavigate } from "react-router-dom";
import { ButtonCreateOrderProps } from "../types";

export default function CreateOrderBtn({ route }: ButtonCreateOrderProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (route) {
            navigate(route)
        }
    }

    return (
        <div className="flex items-end justify-end">
            <button
                onClick={handleClick}
                className="px-4 py-1 text-nowrap font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
                Create Order
            </button>
        </div>
    )
}