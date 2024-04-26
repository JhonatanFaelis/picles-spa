import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { toast, Toaster } from 'sonner';
import { useShelter } from '../../../hooks/useShelter';



export default function SideBar() {

    const { data } = useShelter();

    function validate(event: React.MouseEvent) {
         
        const canAccess = !!data?.shelterWhatsApp
        
        if (!canAccess) {
            event.preventDefault();
            toast.error("Insira os dados do abrigo!")
        }
    }
    return (
        <>
            <Toaster position='top-center' richColors={true}></Toaster>
            <nav className={styles.sidebar}>
                <NavLink to='/admin'
                    className={(isActive) => (isActive ? styles.active : '')} end>
                    Meu abrigo
                </NavLink>
                <NavLink to='/admin/pets'
                    onClick={validate}
                    className={(isActive) => (isActive ? styles.active : '')} end>
                    Pets
                </NavLink>
                <NavLink to='/'
                    className={(isActive) => (isActive ? styles.active : '')} end>
                    Sair
                </NavLink>
            </nav>
        </>
    )
}