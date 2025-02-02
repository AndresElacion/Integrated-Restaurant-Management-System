import { ItemsProps } from "../types";

export default function Items({ id, name, price }: ItemsProps) {

    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <div
            onClick={handleClick}
            className="rounded-lg shadow-md overflow-hidden hover:scale-[105%] ease-out transition duration-300 hover:cursor-pointer bg-gray-200">
            <div className="p-4">
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <p className="hidden">{id}</p>
                        <p className="text-3xl font-bold my-2">{name}</p>
                        <h2 className="text-lg font-semibold text-gray-800">{price}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}