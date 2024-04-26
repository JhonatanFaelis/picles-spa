import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { getShleter } from "../services/shelters/getShelter";
import { IShelter } from "../interfaces/shelter";

export function useShelter(options?: Partial<UseQueryOptions<IShelter, Error>>) : UseQueryResult<IShelter,Error> {
     
    const result = useQuery({
        staleTime : Infinity,
        ...options,
        queryKey: ['get-shelter'],
        queryFn: () => getShleter(),

    })

    return result
}