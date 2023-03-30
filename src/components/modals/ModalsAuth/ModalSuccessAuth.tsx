import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalSuccessAuth = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Авторизация'}
        >
            <Div>
                <Text>Вы успешно авторизовались!</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalSuccessAuth;