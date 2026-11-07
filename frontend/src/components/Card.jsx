/**
 * Reusable Card component for structured container layouts.
 * Adheres to the SmartTask design system defined in index.css with consistent
 * rounded corners, lavender borders, and purple-tinted elevation shadows.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Inner content to display inside the card.
 * @param {string} [props.title] - Optional heading displayed at the top of the card.
 * @param {boolean} [props.hoverable=false] - Enables hover elevation and lift effect.
 * @param {string} [props.className=''] - Additional custom CSS class names.
 */
function Card({
  children,
  title,
  hoverable = false,
  className = '',
  ...rest
}) {
  const hoverClass = hoverable ? 'card-hover' : '';
  const cardClassNames = `card ${hoverClass} ${className}`.trim();

  return (
    <div className={cardClassNames} {...rest}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export { Card };
export default Card;
