import React, { useState } from 'react';
import { Button, FormItem, FormLayout, Input, ModalCard } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';
import {useParams, useRouter} from '@happysanta/router';
import {MODAL_UPDATE_DECLINE, MODAL_UPDATE_SUCCESS} from "../../../router";

const ModalUpdateUser = ({id}: IModal): JSX.Element => {

    const {userId, passportId, adress, fio, password} = useParams();

    const [PassportId, setPassportId] = useState(passportId || '');
    const [Adress, setAdress] = useState(adress || '');
    const [FIO, setFIO] = useState(fio || '')
    const router = useRouter()
    const [Password, setPassword] = useState(password || '')


    const update = async () => {
        try {
            // Получение ФИО
        let FirstName, MiddleName, SecondName;
        if (FIO.split(' ').length === 2) {
            [SecondName, FirstName] = FIO.split(' ');
        }
        else {
            [SecondName, FirstName,  MiddleName] = FIO.split(' ');
        }
        // Обновление данных
        const data = await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/${userId}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({PassportId, Adress, FirstName, MiddleName, SecondName})
        })
        if (password != Password) {
            await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/password/${userId}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({Password})
            })
            //Закрыть модальное окно
            if (data.ok) {
                router.replaceModal(MODAL_UPDATE_SUCCESS);
            } else {
                router.replaceModal(MODAL_UPDATE_DECLINE);
            }
        } }catch (e)
            {
                router.replaceModal(MODAL_UPDATE_DECLINE);
            }
        };

    return (
        <ModalCard
            id={id}
            header={'Изменить данные'}
        >
            <FormLayout>
                <FormItem
                    top="ФИО"
                    status={FIO ? "valid" : "error"}
                    bottom={
                        !FIO && "ФИО"
                    }
                >
                    <Input
                        type="text"
                        name="FIO"
                        value={FIO}
                        onChange={(e) => setFIO(e.target.value)}
                    />
                </FormItem>
                <FormItem
                    top="Паспортные данные"
                    status={PassportId ? "valid" : "error"}
                    bottom={
                        !PassportId && "Введите паспортные данные"
                    }
                >
                    <Input
                        type="text"
                        name="PassportId"
                        value={PassportId}
                        onChange={(e) => setPassportId(e.target.value)}
                    />
                </FormItem>

                <FormItem top="Адрес" bottom={
                    !Adress && "Введите адрес"
                } status={Adress ? "valid" : "error"}>
                    <Input
                        type="text"
                        placeholder="Введите адрес"
                        value={Adress}
                        onChange={(e) => setAdress(e.target.value)}
                    />
                </FormItem>
                <FormItem top="Пароль" bottom={
                    !Password && "Введите пароль"
                } status={Password ? "valid" : "error"}>
                    <Input
                        type="text"
                        placeholder="Введите пароль"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormItem>
                <FormItem>
                    <Button size="l" stretched onClick={update} disabled={PassportId.length === 0 || Adress.length === 0}>
                        Обновить
                    </Button>
                </FormItem>
            </FormLayout>
        </ModalCard>
    );
};

export default ModalUpdateUser;
