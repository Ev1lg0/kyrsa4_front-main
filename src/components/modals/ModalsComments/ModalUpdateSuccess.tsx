import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalUpdateSuccess = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Успех'}
        >
            <Div>
                <Text>Запись успешно обновлена</Text>
                <Text>Закройте модальное окно и обновите страницу!</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalUpdateSuccess;