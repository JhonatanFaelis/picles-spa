import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ImageBase64 } from '../imageBase64/ImageBase64'


interface ICard{
    href : string,
    text : string,
    thumb : string
}

export function Card({href, text, thumb} : ICard){
    return (
        <>
            <Link to={href} className={styles.card}>
                <ImageBase64 src={href}/>
                <span>{text}</span>
            </Link>
        </>
    )
}