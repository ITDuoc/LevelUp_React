import React, { useEffect, useRef } from "react";

interface Props {
  data: number[];
  labels: string[];
}

export default function BarChart({ data, labels }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0,0,width,height);

    const max = Math.max(...data);
    const barWidth = width / data.length - 10;

    data.forEach((v,i) => {
      const barHeight = (v / max) * (height - 40);
      ctx.fillStyle = "#6f42c1";
      ctx.fillRect(i*(barWidth+10)+10, height-barHeight-20, barWidth, barHeight);

      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText(labels[i], i*(barWidth+10)+barWidth/2+10, height-5);
      ctx.fillText(v.toString(), i*(barWidth+10)+barWidth/2+10, height-barHeight-25);
    });
  }, [data, labels]);

  return <canvas ref={canvasRef} width={600} height={350} />;
}
