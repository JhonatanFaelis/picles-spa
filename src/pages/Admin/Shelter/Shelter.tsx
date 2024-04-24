import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input/Input'
import Painel from '../../../components/layout/Panel/Painel'
import styles from './Shelter.module.css'

export default function Shelter() {
    return (
        <>
            <Painel>
                <form>
                    <Input label='Nome' value='' />
                    <Button type='submit'> Salvar dados</Button>
                </form>

            </Painel>
        </>
    )
}

