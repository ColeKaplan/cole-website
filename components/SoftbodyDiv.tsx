import React, { useEffect, useRef } from "react";

interface Vertex {
  x: number;
  y: number;
  ox: number; // original x (rest position)
  oy: number; // original y (rest position)
  vx: number;
  vy: number;
}

interface MouseState {
  x: number;
  y: number;
  down: boolean;
}

interface SoftBodyDivProps {
  width?: number;
  height?: number;
  points?: number;
  radius?: number;
  stiffness?: number; // spring stiffness for neighbor springs
  restoringForce?: number; // force pulling back to original pos
  damping?: number; // velocity damping
  mouseInfluence?: number; // how strongly mouse affects vertices
  color?: string;
}

const SoftBodyDiv: React.FC<SoftBodyDivProps> = ({
  width = 300,
  height = 300,
  points = 32,
  radius = 100,
  stiffness = 0.1,
  restoringForce = 0.1,
  damping = 0.85,
  mouseInfluence = 20,
  color = "#66ccff",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<MouseState>({ x: 0, y: 0, down: true });

  // Vertices stored in ref so animation loop can update without re-rendering
  const verts = useRef<Vertex[]>([]);

  // Initialize vertices once
  useEffect(() => {
    const centerX = width / 2;
    const centerY = height / 2;

    const initialVerts: Vertex[] = [];
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 * i) / points;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      initialVerts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }
    verts.current = initialVerts;
  }, [points, radius, width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    // Simple Verlet integration & spring system
    const updatePhysics = () => {
      const v = verts.current;
      const len = v.length;

      // Apply spring force between neighbors
      for (let i = 0; i < len; i++) {
        const curr = v[i];
        const next = v[(i + 1) % len];

        const dx = next.x - curr.x;
        const dy = next.y - curr.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const desiredDist = (2 * Math.PI * radius) / points;

        // Spring force magnitude
        const springForce = stiffness * (dist - desiredDist);

        // Normalize direction
        const nx = dx / dist;
        const ny = dy / dist;

        // Apply half the force to current vertex, half to next (equal and opposite)
        curr.vx += springForce * nx * 0.5;
        curr.vy += springForce * ny * 0.5;

        next.vx -= springForce * nx * 0.5;
        next.vy -= springForce * ny * 0.5;
      }

      // Apply restoring force toward original position + damping + mouse interaction
      for (const vert of v) {
        // Restoring force pulls vertex back to its original position
        const dx = vert.ox - vert.x;
        const dy = vert.oy - vert.y;

        vert.vx += dx * restoringForce;
        vert.vy += dy * restoringForce;

        // Mouse interaction: push vertices away when mouse is down and near
        if (mouse.current.down) {
          const mdx = vert.x - mouse.current.x;
          const mdy = vert.y - mouse.current.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          const influenceRadius = 80;
          if (dist < influenceRadius && dist > 0) {
            // Force magnitude with falloff
            const force = (1 - dist / influenceRadius) * mouseInfluence;

            vert.vx += (mdx / dist) * force;
            vert.vy += (mdy / dist) * force;
          }
        }

        // Velocity damping
        vert.vx *= damping;
        vert.vy *= damping;

        // Update position
        vert.x += vert.vx;
        vert.y += vert.vy;
      }
    };

    const drawSoftBody = () => {
      const v = verts.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.beginPath();

      // Move to first vertex
      ctx.moveTo(v[0].x, v[0].y);

      // Draw smooth curves using quadraticCurveTo between points
      for (let i = 0; i < v.length; i++) {
        const curr = v[i];
        const next = v[(i + 1) % v.length];

        // Midpoint between current and next vertex
        const cx = (curr.x + next.x) / 2;
        const cy = (curr.y + next.y) / 2;

        ctx.quadraticCurveTo(curr.x, curr.y, cx, cy);
      }

      ctx.closePath();
      ctx.fill();
    };

    const loop = () => {
      updatePhysics();
      drawSoftBody();
      requestAnimationFrame(loop);
    };

    loop();

    // Mouse event handlers
    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.current.down = true;
      const pos = getMousePos(e);
      mouse.current.x = pos.x;
      mouse.current.y = pos.y;
    };

    const handleMouseUp = () => {
      mouse.current.down = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouse.current.down) return;
      const pos = getMousePos(e);
      mouse.current.x = pos.x;
      mouse.current.y = pos.y;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [width, height, points, radius, stiffness, restoringForce, damping, mouseInfluence, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        borderRadius: "1rem",
        display: "block",
        margin: "0 auto",
        background: "transparent",
        cursor: mouse.current.down ? "grabbing" : "grab",
      }}
    />
  );
};

export default SoftBodyDiv;
