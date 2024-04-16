import { ButtonHTMLAttributes } from "react"
import styles from './Button.module.css'
import { ButtonVariant } from "./Button.constants"
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    textButton?: string;
}

export function Button({ textButton = 'Botão' ,variant = ButtonVariant.Default, children, ...rest }: IButton) {
    let buttonClass = styles.buttonBase
    switch (variant) {
        case ButtonVariant.Default:
            buttonClass += ` ${styles.buttonDefault}`
            break;
        case ButtonVariant.Outlined:
            buttonClass += ` ${styles.buttonOutlined}`
            break;
        case ButtonVariant.Text:
            buttonClass += ` ${styles.buttonText}`
            break;
        case ButtonVariant.Disabled:
            buttonClass += ` ${styles.buttonDisabled}`
            break;
    }
    return <>

        <button className={buttonClass} {...rest}>
            {textButton}
        </button>
    </>
}
