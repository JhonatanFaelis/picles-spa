

import { GetPetsRequest, GetPetsResponse } from '../../interfaces/pets'
import httpClient from '../api/httpClient'

export async function getPets(params?: GetPetsRequest) : Promise<GetPetsResponse> {
    try {
        const response = await httpClient.get('/pet', {params})
        return response.data
    } catch (error) {
        console.log('deu ruim papai', error)
        throw error
    }

}