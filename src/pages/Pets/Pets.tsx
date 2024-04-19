import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import { Grid } from "../../components/layout/Grid/Grid";
import styles from './Pets.module.css'
import { Card } from "../../components/common/Card/Card";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";
import { getPets } from "../../services/pets/getPets";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { usePetList} from "../../hooks/usePetList";


export function Pets() {

    const [searchParams, setSearchParams] = useSearchParams()
    const urlParams = {
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    }

    const usePetLists = usePetList(urlParams)
   

    function changePage(page: number) {
        setSearchParams((params) => {
            params.set('page', String(page))
            return params
        })
    }

    return (
        <>
            <Grid>
                <div className={styles.container}>
                    <Header />
                    {
                        usePetLists.isLoading && (
                            <Skeleton count={10} containerClassName={styles.skeleton}></Skeleton>
                        )
                    }
                    <main className={styles.list}>
                        {
                            usePetLists.data?.items.map((pet) => (
                                <Card
                                    key={pet.id}
                                    href={`/pets/${pet.id}`}
                                    text={pet.name}
                                    thumb={pet.photo} />
                            ))
                        }

                    </main>
                    {
                        usePetLists.data?.currentPage && <Pagination
                            currentPage={usePetLists.data.currentPage}
                            totalPages={usePetLists.data.totalPages}
                            onPageChange={(number) => changePage(number)}></Pagination>
                    }
                </div>
            </Grid>

        </>
    )
}