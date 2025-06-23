import * as React from "react";

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 라운드 사각형 테두리 (배경색을 연한 회색으로 변경) */}
      <rect x="8" y="8" width="184" height="184" rx="40" fill="#fff" stroke="#e5e7eb" strokeWidth="6" />
      <g>
        {/* 위쪽 가장 큰 곡선 (밝은 파랑) */}
        <path d="M40 120 Q80 60 160 90" stroke="#7ed6df" strokeWidth="13" fill="none" strokeLinecap="round"/>
        {/* 중간 곡선 (중간 파랑) */}
        <path d="M60 140 Q110 90 170 120" stroke="#48b1f3" strokeWidth="13" fill="none" strokeLinecap="round"/>
        {/* 아래쪽 곡선 (보라) */}
        <path d="M80 160 Q130 130 180 150" stroke="#b39ddb" strokeWidth="13" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
} 

// import * as React from "react";

// export default function Logo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
//   return (
//     <img
//       src="/logo.png" // 실제 파일 경로로 변경
//       alt="서비스 로고"
//       width={props.width || 64}
//       height={props.height || 64}
//       style={{ display: "block", ...props.style }}
//       {...props}
//     />
//   );
// }