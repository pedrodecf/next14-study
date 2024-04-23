import { ReactNode } from "react";
import styles from './button.module.css'

interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
}

export function Button({ children, disabled }: ButtonProps) {
    return (
        <button className={styles.button} disabled={disabled}>{children}</button> 
    )
}