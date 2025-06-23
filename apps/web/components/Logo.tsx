import * as React from "react";

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M40 90 Q70 60 120 80 Q150 90 170 70" stroke="#7ed6df" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M50 120 Q90 90 150 110 Q170 120 180 100" stroke="#48b1f3" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path d="M60 150 Q110 130 160 150 Q180 160 190 140" stroke="#b39ddb" strokeWidth="10" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
} 