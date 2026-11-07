/**
 * Reusable Button component for user interactions.
 * Adheres to the SmartTask design system defined in index.css.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Label or content inside the button.
 * @param {'primary' | 'secondary' | 'outline' | 'ghost'} [props.variant='primary'] - Visual style variant.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - Standard HTML button type.
 * @param {Function} [props.onClick] - Click event handler callback.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className=''] - Additional custom CSS class names.
 */
function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...rest
}) {
  // Map variant prop to design system CSS classes in index.css
  const variantClassMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const selectedVariantClass = variantClassMap[variant] || 'btn-primary';
  const buttonClassNames = `btn ${selectedVariantClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClassNames}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
export default Button;
