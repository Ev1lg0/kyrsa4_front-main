import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalCreateSuccess = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Успешно'}
        >
            <Div>
                <Text>Запись успешно добавлена!</Text>
                <Text>Закройте модальное окно и обновите страницу!</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalCreateSuccess;