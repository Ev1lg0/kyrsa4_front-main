import React from 'react';
import './RightInfo.css';
import { Button, Text } from '@vkontakte/vkui';
import {
  MODAL_AUTH_DECLINE,
  MODAL_AUTH_SUCCESS,
  PAGE_AUTH,
  PAGE_MAIN,
  PANEL_AUTH,
} from '../../router';

import { useRouter } from '@happysanta/router';
import { Icon24DoorArrowLeftOutline } from '@vkontakte/icons';
import { Icon24UserSquareOutline } from '@vkontakte/icons';

const RightInfo: React.FC<{ Name: string }> = ({ Name }) => {
  const router = useRouter();
  return (
    <div className={'rightInfo__wrapper'}>
      <Text className={'rightInfo__company__name'}>
        «Антонов и партнеры»
        <br />
        адвокатского бюро
      </Text>
      <div className={'rightInfo__profile'}>
        <div className={'rightInfo__profile__icon'}>
          <Icon24UserSquareOutline
            width={120}
            height={120}
            style={{ color: '#07B73B' }}
          />
        </div>
        <Text className={'rightInfo__profile__text'}>{Name}</Text>
        <Button
          onClick={() => router.pushPage(PAGE_AUTH)}
          className={'rightInfo__button'}
          after={<Icon24DoorArrowLeftOutline />}
        >
          Выход{' '}
        </Button>
      </div>
      <p className={'rightInfo__about'}>
        О сервисе
        <br />
        Разработчик: Винк А.Д.
        <br />
        Версия сервиса 1.1
      </p>
    </div>
  );
};

export default RightInfo;
