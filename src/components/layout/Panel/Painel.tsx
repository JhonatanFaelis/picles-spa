import { ReactNode } from 'react'
import styles from './Panel.module.css'
import SideBar from '../../common/Sidebar/SideBar'


interface IPanel {
    children: ReactNode
}

export default function Painel({ children }: IPanel) {
    return (
        <>
            <div className={styles.panel}>
                <SideBar />
                <main className={styles.content}>{children}</main>
            </div>
        </>
    )
}