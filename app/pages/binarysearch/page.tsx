// c:\Users\gokul\Desktop\Data Structure\data-visulaiser\app\pages\binarysearch\page.tsx
import { useEffect, useRef, useState } from "react";

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
}

interface BST {
  root: TreeNode | null;
  container: HTMLElement | null;
  svg: SVGSVGElement | null;
  nodeGapX: number;
  nodeGapY: number;
  insert: (value: number) => void;
  delete: (value: number) => void;
  search: (value: number) => void;
  clearHighlights: () => void;
  draw: () => void;
}


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [value, setValue] = useState<string>("");
  const [bst, setBST] = useState<BST | null>(null);

  useEffect(() => {
    class TreeNode implements TreeNode {
      value: number;
      left: TreeNode | null;
      right: TreeNode | null;
      x: number;
      y: number;

      constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
      }
    }

    class BST implements BST {
      root: TreeNode | null = null;
      container: HTMLElement | null;
      svg: SVGSVGElement | null;
      nodeGapX: number = 60;
      nodeGapY: number = 80;

      constructor(container: HTMLElement | null, svg: SVGSVGElement | null) {
        this.container = container;
        this.svg = svg;
      }

      insert(value: number) {
        this.root = this._insert(this.root, value);
        this.draw();
      }

      _insert(node: TreeNode | null, value: number): TreeNode {
        if (!node) return new TreeNode(value);
        if (value < node.value) {
          node.left = this._insert(node.left, value);
        }
        else if (value > node.value) {
          node.right = this._insert(node.right, value);
        }
        return node;
      }

      delete(value: number) {
        this.root = this._delete(this.root, value);
        this.draw();
      }

      _delete(node: TreeNode | null, value: number): TreeNode | null {
        if (!node) return null;
        if (value < node.value) node.left = this._delete(node.left, value);
        else if (value > node.value) node.right = this._delete(node.right, value);
        else {
          if (!node.left) return node.right;
          if (!node.right) return node.left;
          let min = this._findMin(node.right);
          if (min) {
            node.value = min.value;
            node.right = this._delete(node.right, min.value);
          }
        }
        return node;
      }

      _findMin(node: TreeNode): TreeNode {
        while (node.left) node = node.left;
        return node;
      }

      search(value: number) {
        if (!this.container) return;
        this.clearHighlights();
        this._search(this.root, value);
      }

      _search(node: TreeNode | null, value: number) {
        if (!node) return;
        if (!this.container) return;
        const div = this.container.querySelector(`[data-value='${node.value}']`) as HTMLDivElement | null;
        if (div) {
          div.classList.add("bg-orange-400");
        }
        if (value < node.value) this._search(node.left, value);
        else if (value > node.value) this._search(node.right, value);
      }

      clearHighlights() {
        if (!this.container) return;
        this.container.querySelectorAll(".node").forEach(el =>
          el.classList.remove("bg-orange-400")
        );
      }

      draw() {
        if (!this.container || !this.svg) return;
        this.container.querySelectorAll(".node").forEach(el => el.remove());
        this.svg.querySelectorAll("line").forEach(line => line.remove());

        this._assignPositions(this.root, this.container.offsetWidth / 2, 40, this.container.offsetWidth / 4);
        this._drawTree(this.root);
      }

      _assignPositions(node: TreeNode | null, x: number, y: number, offset: number) {
        if (!node) return;
        node.x = x;
        node.y = y;
        this._assignPositions(node.left, x - offset, y + this.nodeGapY, offset / 2);
        this._assignPositions(node.right, x + offset, y + this.nodeGapY, offset / 2);
      }

      _drawTree(node: TreeNode | null) {
        if (!node) return;
        if (!this.container) return;
        const div = document.createElement("div");
        div.className = "node absolute w-10 h-10 bg-green-500 text-white rounded-full border-2 border-black flex items-center justify-center transition-all duration-300";
        div.dataset.value = node.value.toString(); // Ensure value is a string
        div.textContent = node.value.toString(); // Ensure value is a string
        div.style.left = `${node.x}px`;
        div.style.top = `${node.y}px`;
        div.style.transform = "translate(-50%, -50%)";
        div.style.zIndex = "1";
        this.container.appendChild(div);

        if (node.left) this._drawArrow(node, node.left);
        if (node.right) this._drawArrow(node, node.right);

        this._drawTree(node.left);
        this._drawTree(node.right);
      }

      _drawArrow(from: TreeNode, to: TreeNode) {
        if (!this.svg) return;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", from.x.toString());
        line.setAttribute("y1", from.y.toString());
        line.setAttribute("x2", to.x.toString());
        line.setAttribute("y2", to.y.toString());
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("marker-end", "url(#arrow)");
        this.svg.appendChild(line);
      }
    }

    if (containerRef.current && svgRef.current) {
      setBST(new BST(containerRef.current, svgRef.current));
    }
  }, []);

  const handleInsert = () => {
    const val = parseInt(value);
    if (!isNaN(val) && bst) bst.insert(val);
    setValue("");
  };

  const handleDelete = () => {
    const val = parseInt(value);
    if (!isNaN(val) && bst) bst.delete(val);
    setValue("");
  };

  const handleSearch = () => {
    const val = parseInt(value);
    if (!isNaN(val) && bst) bst.search(val);
  };

  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold mb-6">Binary Search Tree Visualization</h1>

      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter value"
          className="border px-3 py-2 rounded w-32"
        />
        <button onClick={handleInsert} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Insert</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
        <button onClick={handleSearch} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Search</button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[600px] border overflow-auto"
        id="tree-container"
      >
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full z-0 overflow-visible"
          id="svg-lines"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="10"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="black" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}