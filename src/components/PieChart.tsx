import React, { useEffect, useRef } from "react";
import type { CategoriaVentas } from "../services/dashboardService";

interface Props {
  data: CategoriaVentas[];
}

export default function PieChart({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = Math.min(canvas.width, canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    const total = data.reduce((acc, c) => acc + c.vendidos, 0);
    let startAngle = -0.5 * Math.PI;

    data.forEach(cat => {
      const sliceAngle = (cat.vendidos / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.arc(canvas.width/2, canvas.height/2, size/2-20, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = cat.color;
      ctx.fill();

      const midAngle = startAngle + sliceAngle/2;
      const textX = canvas.width/2 + (size/3)*Math.cos(midAngle);
      const textY = canvas.height/2 + (size/3)*Math.sin(midAngle);
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const porcentaje = ((cat.vendidos / total)*100).toFixed(1)+"%";
      ctx.fillText(porcentaje, textX, textY);

      startAngle += sliceAngle;
    });
  }, [data]);

  return <canvas ref={canvasRef} width={250} height={250} />;
}
