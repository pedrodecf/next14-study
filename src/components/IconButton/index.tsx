import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from './iconbutton.module.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function IconButton({children, ...rest}: IconButtonProps) {
    return (
        <button {...rest} className={styles.btn}>
            {children}
        </button>
    )
}