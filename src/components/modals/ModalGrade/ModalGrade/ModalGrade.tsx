import React from 'react';
import { Div, ModalCard, Text } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';
import { useParams } from '@happysanta/router';

const ModalTestGrade = ({id}: IModal): JSX.Element => {
    const {grade} = useParams();
    return (
        <ModalCard
            id={id}
            header={'Оценка'}
        >
            <Div>
                <Text>Ваша оценка {grade}</Text>
            </Div>
        </ModalCard>
    );
};

export default ModalTestGrade;