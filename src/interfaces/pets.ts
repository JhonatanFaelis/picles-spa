export interface IPets {
    id: string
    name: string
    type: string
    size: string
    gender: string
    bio: string
    photo: string
}

export type GetPetsRequest = Partial<Pick<IPets,'type'|'size'|'gender'>> & {
    page?:number
}

export type GetPetsResponse = {
    items : IPets[]
    totalPages: number
    currentPage : number
}

export type AddPetRequest = Omit<IPets,'id' | 'photo'>