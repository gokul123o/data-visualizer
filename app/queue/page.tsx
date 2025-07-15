'use client';

import { useState } from "react";
import VisualItem from "../components/VisualItem";
import AlgorithmCard from "../components/AlgorithmCard";
export default function QueuePage() {
    const [queue, setQueue] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const enqueue = () => {
        if (input.trim() === "") return;
        setQueue([...queue, input.trim()]);
        setInput("");
    };

    const dequeue = () => {
        setQueue(queue.slice(1));
    };

    return (
        <>
            <AlgorithmCard
                heading="Queue"
                name="Queue (FIFO)"
                description="A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added to the rear and removed from the front."
                steps={[
                    "Initialize an empty queue.",
                    "Use `enqueue` to add an element at the rear.",
                    "Use `dequeue` to remove the front element.",
                    "Repeat as needed.",
                ]}
                code={`class Queue {
    constructor() {
    this.items = [];
    }

    enqueue(element) {
    this.items.push(element);
    }

    dequeue() {
    if (this.items.length === 0) return "Underflow";
    return this.items.shift();
    }

    front() {
    return this.items[0];
    }
}`}
                pros={[
                    "Efficiently manages processes in order.",
                    "Used in scheduling, BFS, and resource management.",
                    "Supports O(1) operations with proper implementation (e.g., linked list or circular buffer).",
                ]}
                cons={[
                    "Array-based queues may suffer from inefficient shift operations.",
                    "No direct access to middle or rear elements.",
                ]}
            />
            <div className="p-6 text-center min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Queue (FIFO) Visualization</h1>
                <div className="border-2 p-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter value"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border px-3 py-2 mr-2 rounded w-40"
                        />
                        <button onClick={enqueue} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Enqueue</button>
                        <button onClick={dequeue} className="bg-red-600 text-white px-4 py-2 rounded">Dequeue</button>
                    </div>

                    <div className="overflow-x-auto border-2 border-black bg-blue-50 px-4 py-2 rounded max-w-full w-[280px] mx-auto">
                        <div className="flex flex-row items-end justify-start min-h-[100px]">
                            {queue.map((item, index) => (
                                <VisualItem key={index} value={item} />
                            ))}
                        </div>
                    </div>

                    <div className="font-semibold mt-4">← Front | Rear →</div>
                </div>
            </div>
        </>
    );
}
