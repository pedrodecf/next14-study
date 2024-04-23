import { Button } from '../Button'
import styles from './searchbar.module.css'


export function SearchBar(){

     return (
        <form className={styles.form} action="/">
            <input
                name='q'
                className={styles.input}
                type="text"
                placeholder={`Digite o que você procura`}
            />
            <Button>Buscar</Button>
        </form>
    )
}