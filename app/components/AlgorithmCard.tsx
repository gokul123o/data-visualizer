interface AlgorithmCardProps {
    heading: string;
    name: string;
    description: string;
    steps: string[];
    code: string;
    pros: string[];
    cons: string[];
}

export default function AlgorithmCard({
    heading,
    name,
    description,
    steps,
    code,
    pros,
    cons,
}: AlgorithmCardProps) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 ">
            <h1 className="text-4xl text-center text-shadow-gray-500 font-bold text-black">{heading}</h1>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{name}</h2>
            <p className="mb-4 text-gray-700">{description}</p>
            <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1 text-black">Steps:</h3>
                <ol className="list-decimal list-inside text-gray-800">
                    {steps.map((step, i) => (
                        <li key={i}>{step}</li>
                    ))}
                </ol>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1 text-black">Code:</h3>
                <pre className="bg-gray-100 p-4 rounded text-black overflow-x-auto text-sm text-left">
                    <code>{code}</code>
                </pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold text-green-600">✅ Pros:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {pros.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-red-500">❌ Cons:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {cons.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

