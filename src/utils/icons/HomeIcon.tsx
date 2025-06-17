interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  active?: boolean;
}

const HomeIcon = ({ active, className }: HomeIconProps) => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill={active ? '#FFFFFF' : '#858882'}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 ${className}`}
  >
    <path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" />
  </svg>
);

export default HomeIcon;
