import {
  Button,
  Div,
  Panel,
  PanelHeader,
  PullToRefresh,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { IPanel } from '../../../interfaces/IPanel';
import { useRouter } from '@happysanta/router';
import { UsersAttributes } from '../../../interfaces/UsersAttributes';
import { useLocalStorage } from 'usehooks-ts';
import { MODAL_CREATE_USER, MODAL_UPDATE_USER } from '../../../router';
import { ProfessionAttributes } from '../../../interfaces/ProfessionAttributes';
import {
  Icon24UserAddOutline,
  Icon24UserCircleOutline,
  Icon28ChevronLeftOutline,
} from '@vkontakte/icons';
import RightInfo from '../../../components/rightInfo/RightInfo';
import './Users.css';
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}

const Users = ({ id }: IPanel): JSX.Element => {
  const router = useRouter();
  const [isAuth] = useLocalStorage<any>('isAuth', false);
  const [users, setUsers] = useState<extUsers[]>();
  const [userId] = useLocalStorage('userId', 0);
  const [user, setUser] = useState<extUsers>();

  //Получение данных о пользователе
  const getUsers = async () => {
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setUsers(data);
    });
  };

  const deleteHandler = async (id: number) => {
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
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
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader
        separator={false}
        className={'user__header'}
        before={
          <Icon28ChevronLeftOutline
            onClick={() => router.popPage()}
            style={{ color: '#4BB34B', marginTop: 3 }}
          />
        }
      >
        <span
          className={'users__header__button'}
          onClick={() => router.pushModal(MODAL_CREATE_USER)}
        >
          Создать
          <Icon24UserAddOutline
            width={20}
            height={16}
            className={'users__add__user'}
          />
        </span>
        Пользователи
      </PanelHeader>
      <PullToRefresh onRefresh={getUsers}>
        {isAuth.role === 1 && <Div></Div>}
        {users &&
          users.map((user) => (
            <Div className={'users__list__wrapper'}>
              <div className={'users__list__card'}>
                <Icon24UserCircleOutline
                  width={80}
                  height={80}
                  className={'users__list__card__icon'}
                />
                <h1>{`${user.FirstName + ' '} ${user.SecondName} ${
                  user.MiddleName
                }`}</h1>
                <Text>Адрес: {user.Adress}</Text>
                <Text>Пасспортные данные: {user.PassportId}</Text>
                <Text>Дата рождения: {user.DateOfBirth}</Text>
                <Text>
                  Профессия: {user.ProfessionName_Profession.ProfessionName}
                </Text>
                {isAuth && (isAuth.id === user.id || isAuth.role === 1) && (
                  <div>
                    <Button
                      mode="primary"
                      size="s"
                      style={{ margin: '10px', backgroundColor: '#54ad32' }}
                      onClick={() =>
                        router.pushModal(MODAL_UPDATE_USER, {
                          userId: `${user.id}`,
                          adress: user.Adress,
                          passportId: user.PassportId,
                          fio: `${user.FirstName} ${
                            user.MiddleName !== null
                              ? user.MiddleName + ' '
                              : ''
                          }${user.SecondName}`,
                        })
                      }
                    >
                      Изменить
                    </Button>
                    {isAuth.role === 1 && (
                      <Button
                        mode="primary"
                        size="s"
                        style={{ margin: '10px', backgroundColor: '#EA4949' }}
                        onClick={() => deleteHandler(user.id)}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Div>
          ))}
      </PullToRefresh>
      {user && (
        <RightInfo
          Name={`${user.FirstName + ' '} ${user.SecondName} ${user.MiddleName}`}
        />
      )}
    </Panel>
  );
};

export default Users;
