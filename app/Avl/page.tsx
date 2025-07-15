'use client'

import { useRef, useState } from 'react';
import AlgorithmCard from '../components/AlgorithmCard';

class AVLNode {
  value: number;
  left: AVLNode | null = null;
  right: AVLNode | null = null;
  height: number = 1;
  x: number = 0;
  y: number = 0;

  constructor(value: number) {
    this.value = value;
  }
}

class AVLTree {
  root: AVLNode | null = null;

  getHeight(node: AVLNode | null): number {
    return node ? node.height : 0;
  }

  getBalance(node: AVLNode | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node: AVLNode) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  rotateRight(y: AVLNode): AVLNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(value: number, node: AVLNode | null = this.root): AVLNode {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this.insert(value, node.left);
    } else if (value > node.value) {
      node.right = this.insert(value, node.right);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left!.value) return this.rotateRight(node);
    if (balance < -1 && value > node.right!.value) return this.rotateLeft(node);
    if (balance > 1 && value > node.left!.value) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  add(value: number) {
    this.root = this.insert(value, this.root);
  }
}

function assignCoordinates(node: AVLNode | null, depth: number, xPos: { x: number }, gap: number) {
  if (!node) return;

  assignCoordinates(node.left, depth + 1, xPos, gap);
  node.x = xPos.x * gap;
  node.y = depth * 100;
  xPos.x += 1;
  assignCoordinates(node.right, depth + 1, xPos, gap);
}

function collectNodes(node: AVLNode | null): AVLNode[] {
  if (!node) return [];
  return [...collectNodes(node.left), node, ...collectNodes(node.right)];
}

export default function AVLTreePage() {
  const [tree] = useState(new AVLTree());
  const [nodes, setNodes] = useState<AVLNode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInsert = () => {
    const val = parseInt(inputRef.current!.value);
    if (!isNaN(val)) {
      tree.add(val);
      const xPos = { x: 1 };
      assignCoordinates(tree.root, 0, xPos, 60);
      setNodes([...collectNodes(tree.root)]);
    }
    inputRef.current!.value = '';
  };

  return (
    <>
    <AlgorithmCard
  heading="AVL Tree"
  name="AVL Tree (Self-Balancing BST)"
  description="An AVL Tree is a self-balancing Binary Search Tree where the difference in heights of left and right subtrees (balance factor) is at most 1 for every node."
  steps={[
    "Start with an empty AVL Tree.",
    "Insert nodes like a regular BST.",
    "After each insertion or deletion, update the height of the affected nodes.",
    "Calculate the balance factor (height(left) - height(right)).",
    "If balance factor is not between -1 and 1, perform rotations to restore balance.",
  ]}
  code={`class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(this.getHeight(x.left), this.getHeight(x.right));
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
    return y;
  }

  insert(node, value) {
    if (!node) return new AVLNode(value);
    if (value < node.value) node.left = this.insert(node.left, value);
    else if (value > node.value) node.right = this.insert(node.right, value);
    else return node;

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left.value) return this.rotateRight(node);

    // Right Right Case
    if (balance < -1 && value > node.right.value) return this.rotateLeft(node);

    // Left Right Case
    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}`}
pros={[
  "Always balanced — guarantees O(log n) insert, delete, and search.",
  "Better performance for dynamic data with frequent insertions/deletions.",
  "Used in databases and memory-intensive systems.",
]}
cons={[
  "More complex to implement than regular BST.",
  "Rotations add overhead during insertion and deletion.",
  "Slightly slower than simple BSTs for read-only operations.",
]}
/>


    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">AVL Tree Visualization</h1>
      <div className="flex justify-center mb-4 gap-2">
        <input ref={inputRef} type="number" className="border p-2 w-40" placeholder="Enter value" />
        <button onClick={handleInsert} className="bg-blue-500 text-white px-4 py-2 rounded">
          Insert
        </button>
      </div>
      <div className="relative w-full h-[500px] border rounded">
        <svg className="absolute top-0 left-0 w-full h-full">
          {nodes.map((node, index) => (
            node.left && (
              <line key={`${index}-l`} x1={node.x + 25} y1={node.y + 25} x2={node.left.x + 25} y2={node.left.y + 25}
                stroke="white" />
            )
          ))}
          {nodes.map((node, index) => (
            node.right && (
              <line key={`${index}-r`} x1={node.x + 25} y1={node.y + 25} x2={node.right.x + 25} y2={node.right.y + 25}
                stroke="white" />
            )
          ))}
        </svg>
        {nodes.map((node, index) => (
          <div key={index}
            className="absolute bg-green-500 text-white text-center rounded-full w-10 h-10 flex items-center justify-center"
            style={{ left: node.x, top: node.y }}>
            {node.value}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
