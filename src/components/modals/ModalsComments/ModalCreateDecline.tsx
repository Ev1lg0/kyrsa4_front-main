import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';

const ModalCreateDecline = ({id}: IModal): JSX.Element => {
    return (
        <ModalCard
            id={id}
            header={'Операция отменена'}
        >
            <Div>
                <Text>Запись не была добавлена</Text>
                <Text>Обновите страницу, закройте модальное и попробуйте вновь, <br/>
                    заполнив все поля корректными данными</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalCreateDecline;