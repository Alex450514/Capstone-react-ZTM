// Default, inverted, google sign-in
import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

const Button = ({ handler, children, buttonType, ...otherProps }) => {
    return (
        <button onClick={handler} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button;