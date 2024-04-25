import { useForm } from 'react-hook-form'
import { Button } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input/Input'
import Painel from '../../../components/layout/Panel/Painel'
import styles from './Shelter.module.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'

export default function Shelter() {



    const shelterSchema = z.object({
        name: z.string()
            .min(2, 'Nome deve ter no mínimo 2 caracteres.')
            .max(30, 'Nome deve ter no máximo 30 caracteres'),
        email: z.string()
            .email('Campo deve ser um email valido'),
        phone: z.string().refine((value) => {
            const digits = value.replace(/\D/g,'').length
            return digits >= 10 && digits <11   
        },'Número deve ter entre 10 e 11 caracteres.'),
        whatsApp: z.string().refine((value) =>{
            const digits = value.replace(/\D/g,'').length
            return digits >= 10 && digits <11
        },'Número deve ter entre 10 e 11 caracteres.')
    })

    type ShelterSchema = z.infer<typeof shelterSchema>

    const { handleSubmit, register, formState } = useForm<ShelterSchema>({
        resolver: zodResolver(shelterSchema)
    });

    const registerWithMask = useHookFormMask(register)

    function submit({ name }: ShelterSchema) {
        console.log(name)
    }
    return (
        <>
            <Painel>
                <form className={styles.container} onSubmit={handleSubmit(submit)}>
                    <div>
                        <Input label='Nome'  {...register('name')} />
                        {formState.errors?.name && (<p className={styles.formError}>{formState.errors.name.message}</p>)}
                    </div>
                    <div>
                        <Input label='Email'  {...register('email')} />
                        {formState.errors?.email && (<p className={styles.formError}>{formState.errors.email.message}</p>)}
                    </div>
                    <div>
                        <Input label='Telefone'  {...registerWithMask('phone',['99 9999-9999'])} />
                        {formState.errors?.phone && (<p className={styles.formError}>{formState.errors.phone.message}</p>)}
                    </div>
                    <div>
                        <Input label='WhatsApp'  {...registerWithMask('whatsApp',['99 99999-9999'])} />
                        {formState.errors?.whatsApp && (<p className={styles.formError}>{formState.errors.whatsApp.message}</p>)}
                    </div>
                    <Button type='submit'> Salvar dados</Button>
                </form>

            </Painel>
        </>
    )
}

