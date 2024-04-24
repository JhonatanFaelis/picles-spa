import { forwardRef, InputHTMLAttributes, Ref } from 'react'
import styles from './Input.module.css'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

 function FowardInput({ label, ...rest }: IInput, ref : Ref<HTMLInputElement>) {
    return (
        <>
            <div className={styles.inputGroup}>
                <label htmlFor="">{label}</label>
                <input ref={ref} type="text" {...rest}/>
            </div>
        </>
    )
}

export const Input = forwardRef(FowardInput);
 