import { AddPetRequest, IPets } from '../../interfaces/pets'
import httpClient from '../api/httpClient'

export async function addPet(params : AddPetRequest) : Promise<IPets>{
    try {
        const response = await httpClient.put('/pet', params)
        return response.data
    } catch (error) {
        console.error('Erro ao adicionar pet:', error)
        throw error
    }
}