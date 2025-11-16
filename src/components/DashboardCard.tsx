import React from "react";

interface Props {
  title: string;
  value: string | number;
}

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="cardSimple p-3 flex-fill">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}
