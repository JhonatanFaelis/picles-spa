import { useQuery } from "@tanstack/react-query"
import { getPets } from "../services/pets/getPets"
import { GetPetsRequest, GetPetsResponse } from "../interfaces/pets"

interface IUsePetList{
    data? : GetPetsResponse
    isLoading: boolean
}
export function usePetList(params : GetPetsRequest): IUsePetList{
    const { data, isLoading } = useQuery({
        queryKey: ['getPets', params],
        queryFn: () => getPets(params),
    })

    return {data,isLoading}
}