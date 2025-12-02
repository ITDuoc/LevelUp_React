import React, { useEffect, useRef } from "react";
import type { CategoriaVentas } from "../services/dashboardService";

interface Props {
  data: CategoriaVentas[];
}

export default function CategoryLegend({ data }: Props) {
  return (
    <div className="cardSimple p-2 mt-3">
      <ul className="list-unstyled mb-0">
        {data.map(cat => (
          <li key={cat.nombre} className="d-flex align-items-center mb-1">
            <span style={{ display:"inline-block", width:15, height:15, backgroundColor:cat.color, borderRadius:"50%", marginRight:10 }} />
            <span style={{ color:"#FFFFFF" }}>{cat.nombre}: {cat.vendidos}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
