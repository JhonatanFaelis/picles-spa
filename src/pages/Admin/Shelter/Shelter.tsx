import { useForm } from 'react-hook-form'
import { Button, ButtonVariant } from '../../../components/common/Button'
import { Input } from '../../../components/common/Input/Input'
import Painel from '../../../components/layout/Panel/Painel'
import styles from './Shelter.module.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormMask } from 'use-mask-input'
import { toast, Toaster } from 'sonner'
import { updateShelter } from '../../../services/shelters/updateShelter'
import { useShelter } from '../../../hooks/useShelter'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export default function Shelter() {



    const shelterSchema = z.object({
        name: z.string()
            .min(2, 'Nome deve ter no mínimo 2 caracteres.')
            .max(30, 'Nome deve ter no máximo 30 caracteres'),
        email: z.string()
            .email('Campo deve ser um email valido'),
        phone: z.string().refine((value) => {
            const digits = value.replace(/\D/g, '').length
            return digits >= 10 && digits <= 11
        }, 'Número deve ter entre 10 e 11 caracteres.'),
        whatsApp: z.string().refine((value) => {
            const digits = value.replace(/\D/g, '').length
            return digits >= 10 && digits <= 11
        }, 'Número deve ter entre 10 e 11 caracteres.')
    })

    type ShelterSchema = z.infer<typeof shelterSchema>

    const { handleSubmit, register, formState, reset } = useForm<ShelterSchema>({
        resolver: zodResolver(shelterSchema)
    });

    const registerWithMask = useHookFormMask(register);
    const queryCliente = useQueryClient();
    const { data, isLoading } = useShelter()

    useEffect(() => {
        if (!isLoading && data) {
            reset({
                name: data.shelterName,
                email: data.shelterEmail,
                phone: data.shelterPhone,
                whatsApp: data.shelterWhatsApp,
            })
        }
    }, [data, isLoading, reset])

    async function submit({ name, email, phone, whatsApp }: ShelterSchema) {
        const toastId = toast.loading('Salvando dados');

        try {
            await updateShelter({
                name,
                email,
                phone: phone.replace(/\D/g, ''),
                whatsApp: whatsApp.replace(/\D/g, '')
            }),
                queryCliente.invalidateQueries({ queryKey: ['get-shelter'] })
            toast.success('Dados salvos com sucesso', {
                id: toastId,
                closeButton: true
            })
        } catch (error) {
            toast.error('Não foi Possível salvar os dados', {
                id: toastId,
                closeButton: true
            })

        }
    }
    return (
        <>
            <Painel>
                {/* <Toaster position='top-center' richColors={true}></Toaster> */}
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
                        <Input label='Telefone'  {...registerWithMask('phone', ['99 9999-9999'])} />
                        {formState.errors?.phone && (<p className={styles.formError}>{formState.errors.phone.message}</p>)}
                    </div>
                    <div>
                        <Input label='whatsApp'  {...registerWithMask('whatsApp', ['99 99999-9999'])} />
                        {formState.errors?.whatsApp && (<p className={styles.formError}>{formState.errors.whatsApp.message}</p>)}
                    </div>
                    <Button type='submit'
                        variant={!formState.isDirty || formState.isSubmitting ? ButtonVariant.Disabled : ButtonVariant.Default}>
                        Salvar dados</Button>
                </form>

            </Painel>
        </>
    )
}

