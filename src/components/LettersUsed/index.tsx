import  styles from "./style.module.css"

import { Letter } from "../Letter"

export function LettersUsed(){
    return <div className={styles.lettersUsed}>
        <h5>Letras utilizadas</h5>

        <div>
            <Letter value="r" size="small" color="correct" />
            <Letter value="x" size="small" color="wrong"/>
        </div>
    </div>
}