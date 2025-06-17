interface SparklesIconProps extends React.SVGProps<SVGSVGElement> {
  selected?: Boolean;
}

const SparklesIcon = ({ className, selected = false }: SparklesIconProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14.7273 -0.00012207L13.6964 2.24988L11.4545 3.27261L13.6964 4.30351L14.7273 6.54533L15.75 4.30351L18 3.27261L15.75 2.24988M6.54545 2.45442L4.5 6.95442L0 8.99988L4.5 11.0453L6.54545 15.5453L8.59091 11.0453L13.0909 8.99988L8.59091 6.95442M14.7273 11.4544L13.6964 13.6962L11.4545 14.7271L13.6964 15.7499L14.7273 17.9999L15.75 15.7499L18 14.7271L15.75 13.6962"
      // fill="active color"
      fill={`${selected ? "#C9FF3B" : "#FFFFFF"}`}
    />
  </svg>
);

export default SparklesIcon;
