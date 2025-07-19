interface IconButtonProps {
  onClick: (e?: React.MouseEvent) => void;
  className?: string;
}

export default function IconButton({ onClick, className = "" }: IconButtonProps) {
  return (
    <div 
      onClick={(e) => onClick(e)}
      className={`cursor-pointer hover:bg-red-100 rounded-full p-2 transition-colors ${className}`}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-red-500 hover:text-red-700"
      >
        <polyline points="3,6 5,6 21,6"></polyline>
        <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>
  );
}
