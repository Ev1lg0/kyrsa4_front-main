import React, { useEffect, useState } from 'react';
import { IModal } from '../../../interfaces/IModal';
import { Button, Div, ModalCard, Text } from '@vkontakte/vkui';
import { useParams, useRouter } from '@happysanta/router';
import { useLocalStorage } from 'usehooks-ts';
import { UsersAttributes } from '../../../interfaces/UsersAttributes';
import { ProfessionAttributes } from '../../../interfaces/ProfessionAttributes';
import { MODAL_UPDATE_USER } from '../../../router';
import './ModalUser.css';
import { Icon24UserCircleOutline } from '@vkontakte/icons';
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}

const ModalUser = ({ id }: IModal): JSX.Element => {
  const router = useRouter();
  const [isAuth] = useLocalStorage<any>('isAuth', false);
  const [userId] = useLocalStorage('userId', 0);
  const [user, setUser] = useState<extUsers>();
  // const { id: userId } = useParams();
  console.log(userId);
  console.log(useParams());
  const getUser = async () => {
    console.log(1);

    const response = await fetch(
      `https://Kyrsa4back.ev1lg0.repl.co/api/users/${userId}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response);
    const data = await response.json();

    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [userId]);
  return (
    <ModalCard id={id} header={'Профиль'}>
      {user && (
        <Div>
          <Icon24UserCircleOutline
            width={48}
            height={48}
            style={{
              color: '#4BB34B',
              position: 'relative',
              left: '43%',
            }}
          />
          <h1 className={'modalUser__name'}>{`${user.FirstName + ' '} ${
            user.SecondName
          } ${user.MiddleName}`}</h1>
          <Text>Адрес: {user.Adress}</Text>
          <Text>Пасспортные данные: {user.PassportId}</Text>
          <Text>Дата рождения: {user.DateOfBirth}</Text>
          <Text>
            Профессия: {user.ProfessionName_Profession.ProfessionName}
          </Text>
          {isAuth && (isAuth.id === user.id || isAuth.role === 1) && (
            <Button
              mode="primary"
              size="s"
              className={'modalUser__button'}
              onClick={() =>
                router.pushModal(MODAL_UPDATE_USER, {
                  userId: `${user.id}`,
                  adress: user.Adress,
                  passportId: user.PassportId,
                  fio: `${user.FirstName} ${
                    user.MiddleName !== null ? user.MiddleName + ' ' : ''
                  }${user.SecondName}`,
                })
              }
            >
              Изменить
            </Button>
          )}
        </Div>
      )}
    </ModalCard>
  );
};

export default ModalUser;
