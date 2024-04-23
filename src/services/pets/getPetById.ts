import { IPets } from '../../interfaces/pets';
import httpClient from '../api/httpClient'

export async function getPetById(id:string) : Promise<IPets> {
    try {
        const response = await httpClient.get(`/pet/${id}`);
        return (await response).data
    } catch (error) {
       console.error('Erro ao buscar Pet por id', error) 
       throw error
    }
}