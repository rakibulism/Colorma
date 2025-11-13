import svgPaths from "./svg-1yszzwf6ht";

interface GroupProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Group({ className, style }: GroupProps) {
  return (
    <div className={`relative size-full ${className || ''}`} style={style}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
        <g clipPath="url(#clip0_17_2434)" id="Group 3">
          <g id="Group 1">
            <path d={svgPaths.p1aa5b180} id="Vector 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            <path d={svgPaths.p37697db0} id="Vector 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </g>
          <g id="Group 2">
            <path d={svgPaths.p34d99900} id="Vector 1_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </g>
          <g id="Vector 3">
            <path d={svgPaths.p1794a240} fill="currentColor" fillOpacity="0.2" />
            <path d={svgPaths.p23205380} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_17_2434">
            <rect fill="white" height="27" width="26.5" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
