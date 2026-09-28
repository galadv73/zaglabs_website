const ZagLabsLogo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 180 36" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Z icon - original style with arrows */}
      <g stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Top horizontal line with arrow */}
        <path d="M4 6 L24 6 L18 12" />
        {/* Diagonal connecting line */}
        <path d="M24 6 L4 30" />
        {/* Bottom horizontal line with arrow */}
        <path d="M4 30 L24 30 L18 24" />
      </g>
      
      {/* ZagLabs text */}
      <text 
        x="38" 
        y="25" 
        className="fill-foreground"
        style={{ 
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '21px',
          fontWeight: 800,
          letterSpacing: '-0.02em'
        }}
      >
        ZagLabs
      </text>
    </svg>
  );
};

export default ZagLabsLogo;
