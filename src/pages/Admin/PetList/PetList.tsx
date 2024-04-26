import { Link } from 'react-router-dom'
import Painel from '../../../components/layout/Panel/Painel'
import styles from './PetList.module.css'
import { Button } from '../../../components/common/Button'

export default function PetList() {
    return (
        <>
            <Painel>
                <div className={styles.container}>
                    <Link to='/admin/pets/new'>
                        <Button>
                            Novo Pet
                        </Button>
                    </Link>
                </div>
            </Painel>
        </>
    )
}