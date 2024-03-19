// Default, inverted, google sign-in
import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles.jsx';


export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

const getButtonComponent = (buttonType) => {
    const buttonComponents = {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    };
    return buttonComponents[buttonType];
}

const Button = ({ children, buttonType, ...otherProps }) => {

    const ButtonComponent = getButtonComponent(buttonType);
    return (
        <ButtonComponent {...otherProps}>
            {children}
        </ButtonComponent>
    )
}

export default Button;