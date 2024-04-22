import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import { Grid } from "../../components/layout/Grid/Grid";
import styles from './Pets.module.css'
import { Card } from "../../components/common/Card/Card";
import { Skeleton } from "../../components/common/Skeleton/Skeleton";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { usePetList } from "../../hooks/usePetList";
import { Select } from "../../components/common/Select/Select";
import { Button, ButtonVariant } from "../../components/common/Button";
import { filterColumns } from "./PetsConstants";
import { ChangeEvent, FormEvent, useState } from "react";
import { GetPetsRequest } from "../../interfaces/pets";


export function Pets() {

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams()

    const urlParams = {
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        type: searchParams.get('type') ?? '',
        size: searchParams.get('size') ?? '',
        gender: searchParams.get('gender') ?? '',
    }

    const usePetLists = usePetList(urlParams)

    function changePage(page: number) {
        setSearchParams((params) => {
            params.set('page', String(page))
            return params
        })
    }

    function getFormValue(form: HTMLFormElement) {
        const formData = new FormData(form)
        return Object.fromEntries(formData)
    }

    function updateSearchParams(urlParams: GetPetsRequest) {
        const fields: (keyof GetPetsRequest)[] = ['type', 'size', 'gender']
        const newParams = new URLSearchParams()

        fields.forEach((field) => {
            if (urlParams[field]) {
                newParams.set(field, String(urlParams[field]))
            }
        })
        newParams.set('page', '1')

        return newParams
    }

    function applyFilters(event: FormEvent) {
        event.preventDefault()

        const formValues = getFormValue(event.target as HTMLFormElement)
        const newSearchParams = updateSearchParams(formValues)

        setSearchParams(newSearchParams)
        setIsButtonEnabled(false)
    }

    function checkButtonStatus(event: ChangeEvent<HTMLFormElement>) {
        const { type, size, gender } = getFormValue(event.target.form)

        if (type !== urlParams.type || size !== urlParams.type || gender !== urlParams.type)
            setIsButtonEnabled(true)
        else
            setIsButtonEnabled(false)

    }

    return (
        <>
            <Grid>
                <div className={styles.container}>
                    <Header />

                    <form action="" className={styles.filters} onSubmit={applyFilters} onChange={checkButtonStatus}>
                        <div className={styles.columns}>
                            {filterColumns.map((filter) => (
                                <div key={filter.name} className={styles.column}>   
                                    <Select defaultValue={urlParams[filter.name]} label={filter.title} options={filter.options} name={filter.name} />
                                </div>
                            ))}
                        </div>
                        <Button type='submit' variant={isButtonEnabled ? ButtonVariant.Default : ButtonVariant.Disabled} textButton="Buscar" />
                    </form>
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