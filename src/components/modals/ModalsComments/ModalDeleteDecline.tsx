import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalDeleteDecline = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Операция отменена'}
        >
            <Div>
                <Text>Не удалось удалить запись</Text>
                <Text>Пожалуйста, обновите страницу</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalDeleteDecline;