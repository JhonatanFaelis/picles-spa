import { Link } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import { Grid } from "../../components/layout/Grid/Grid";
import styles from './Pets.module.css'
import { Card } from "../../components/common/Card/Card";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";


export function Pets() {
    return (
        <>
            <Grid>
                <div className={styles.container}>
                    <Header />
                    <main className={styles.list}>
                        {true && <Skeleton count={5} containerClassName={styles.skeleton} />}
                        <Card href="/pets/1" text="nina" thumb="https://img.freepik.com/fotos-gratis/isolado-feliz-sorridente-cao-fundo-branco-retrato-4_1562-693.jpg" />
                    </main>
                </div>
            </Grid>

        </>
    )
}