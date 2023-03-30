import React from 'react';
import { Div, ModalCard } from "@vkontakte/vkui";
import { IModal } from 'interfaces/IModal';
import './ModalInfo.css';

const ModalInfo = ({id}: IModal): JSX.Element => {
  return (
    <ModalCard
      id={id}
      header={'Информация'}
    >
      <Div>
        <div className={'info__row'}>
          <h3>Разработчик: </h3>
          <p>Винк Александр</p>
        </div>
        <div className={'info__row'}>
          <h3>Версия: </h3>
          <p>1.0.0</p>
        </div>
      </Div>
    </ModalCard>
  );
};

export default ModalInfo;