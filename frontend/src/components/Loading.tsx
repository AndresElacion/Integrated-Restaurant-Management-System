export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="bg-white rounded-lg shadow p-6 mb-5">
                    <div className="h-6 w-72 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow animate-pulse">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                            <div className="h-8 w-16 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}