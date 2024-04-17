import { Link } from "react-router-dom";
import { Button, ButtonVariant } from "../../components/common/Button";
import styles from './Home.module.css'
import dog from '../../assets/dog.svg'



export function Home() {
    return (
        <div className={styles.container}>
            <img src={dog}></img>
            <Link to='/pets'>
                <Button textButton='Quero Adotar' />
            </Link>
            <Link to='/admin'>
                <Button variant={ButtonVariant.Outlined} textButton='Tenho um abrigo' />
            </Link>
        </div>

    )
}