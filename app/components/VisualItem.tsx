interface VisualItemProps {
    value: string;
}

export default function VisualItem({ value }: VisualItemProps) {
    return (
        <div className="bg-green-600 text-white px-4 py-2 m-1 rounded min-w-[40px] text-center transition-all">
            {value}
        </div>
    );
}
