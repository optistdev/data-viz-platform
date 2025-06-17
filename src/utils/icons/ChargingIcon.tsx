interface ChargingIconProps extends React.SVGProps<SVGSVGElement> {}

const ChargingIcon = ({ className }: ChargingIconProps) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M13.75 18.7499H7.5L16.25 1.24988V11.2499H22.5L13.75 28.7499V18.7499Z"
      fill="white"
    />
  </svg>
);

export default ChargingIcon;
