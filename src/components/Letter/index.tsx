import styles from "./style.module.css"

type Props = {
    value: string | undefined,
    size?: "default" | "small",
    color?: "default" | "correct" | "wrong"
}

export function Letter({value = "", size = "default", color = "default"}: Props){
    return (
        <div className={`
            ${styles.letter}
            ${size === "small" && styles.letterSmall}
            ${color === "correct" && styles.letterCorrect}
            ${color === "wrong" && styles.letterWrong}
        `}>
            <span> {value} </span>
        </div>
    )
}