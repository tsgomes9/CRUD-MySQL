import React, {useRef, useEffect} from 'react';
import styled from 'styled-components'
import {toast} from 'react-toastify'
import axios from 'axios';
import {FormContainer, InputArea, Label, Input, Button} from './style'


export default function Form({onEdit, setOnEdit, getUsers}) {

    const ref = useRef()

    useEffect(() => {
        if(onEdit) {
            const user = ref.current

            user.name.value = onEdit.name
            user.email.value = onEdit.email
            user.fone.value = onEdit.fone
            user.date.value = onEdit.date
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = ref.current;

        if (
            !user.name.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.date.value
        ) {
            return toast.warn('Preencha todos os campos')
        }

        if (onEdit) {
            await axios 
                .put('http://localhost:8800/' + onEdit.id , {
                    name: user.name.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    date: user.date.value
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        } else { 
            await axios 
                .post('http://localhost:8800', {
                    name: user.name.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    date: user.date.value
                })
                .then(({data}) => toast.success(data))
                .catch(({data}) => toast.error(data))
        }

        setOnEdit(null)
        getUsers()
    }

    return ( 
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name='name' />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name='email' />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name='fone' />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name='date' type='text'/>
            </InputArea>
            <Button type='submit'>Salvar</Button>
        </FormContainer>
    )
}