import styles from "./styles.module.css"

import iconTip from "../../assets/tip.svg"

type Props = {
    tip: string
}

export function Tip({ tip }:Props){
    return (
        <div className={styles.container}>
            <img src={iconTip} alt="Icon de dica" />

            <div>
                <h3>Dica</h3>
                <p>{ tip }</p>
            </div>
        </div>
        
    )
}