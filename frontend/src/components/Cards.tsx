import { CardProps } from "../types";

export default function Cards({ title, count, color }: CardProps) {
    return (
        <div className={`${color} rounded-lg shadow-md overflow-hidden hover:scale-[105%] ease-out transition duration-300`}>
            <div className="p-4">
                <div className="flex items-center justify-center">
                    <div className="text-center text-white">
                        <p className="text-3xl font-bold my-2">{count}</p>
                        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}