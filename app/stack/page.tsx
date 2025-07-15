'use client';

import { useState } from "react";
import VisualItem from "@/app/components/VisualItem";
import AlgorithmCard from "../components/AlgorithmCard";

export default function StackPage() {
  const [stack, setStack] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const pushStack = () => {
    if (input.trim() === "") return;
    setStack([...stack, input.trim()]);
    setInput("");
  };

  const popStack = () => {
    setStack(stack.slice(0, -1));
  };

  return (
    <>
    <AlgorithmCard
      heading="Stack"
        name="Stack (LIFO)"
        description="A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the top of the stack."
        steps={[
          "Initialize an empty stack.",
          "Use `push` to insert an element on top of the stack.",
          "Use `pop` to remove the top element.",
          "Repeat operations as needed.",
        ]}
        code={`class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }
}`}
        pros={[
          "Simple to implement.",
          "Efficient operations: O(1) for push and pop.",
          "Used in backtracking, undo functionality, and expression parsing.",
        ]}
        cons={[
          "Only the top element can be accessed.",
          "Not ideal for searching or accessing arbitrary elements.",
        ]}
      />
    
    <div className="p-6 text-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Stack (LIFO) Visualization</h1>
      <div className="border-2 border-white p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-2 mr-2 rounded w-40"
        />
        <button onClick={pushStack} className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Push</button>
        <button onClick={popStack} className="bg-red-600 text-white px-4 py-2 rounded">Pop</button>
      </div>

      <div className="flex flex-col-reverse items-center border-2 border-black bg-blue-50 w-32 min-h-[200px] mx-auto p-2 rounded">
        {stack.map((item, index) => (
          <VisualItem key={index} value={item} />
        ))}
      </div>

      <div className="font-semibold mt-4">Top</div>
    </div>
    </div>
    </>
  );
}
