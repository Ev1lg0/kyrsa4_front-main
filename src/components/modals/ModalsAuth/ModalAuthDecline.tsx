import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalAuthDecline = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Авторизация'}
        >
            <Div>
                <Text>Неверный логин или пароль</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalAuthDecline;