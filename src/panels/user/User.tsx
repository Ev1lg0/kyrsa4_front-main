import {
  Button,
  Div,
  Panel,
  PanelHeader,
  PullToRefresh,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/Menu';
import { IPanel } from '../../interfaces/IPanel';
import { useParams, useRouter } from '@happysanta/router';
import { UsersAttributes } from '../../interfaces/UsersAttributes';
import { useLocalStorage } from 'usehooks-ts';
import { MODAL_UPDATE_USER } from '../../router';
import { ProfessionAttributes } from '../../interfaces/ProfessionAttributes';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}

const User = ({ id }: IPanel): JSX.Element => {
  const router = useRouter();
  const [isAuth] = useLocalStorage<any>('isAuth', false);
  const [user, setUser] = useState<extUsers>();
  const { id: userId } = useParams();
  const getUser = async () => {
    console.log(1);
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/${userId}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();

      setUser(data);
    });
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Panel id={id}>
      <PanelHeader
        className={'user__header'}
        before={
          <Icon28ChevronLeftOutline
            onClick={() => router.popPage()}
            style={{ color: '#B8C1CC', marginTop: 3 }}
          />
        }
      >
        Профиль
      </PanelHeader>
      <PullToRefresh onRefresh={getUser}>
        {user && (
          <Div className={'user__data'}>
            <h1>{`${user.FirstName + ' '} ${user.SecondName} ${
              user.MiddleName
            }`}</h1>
            <Text>Адрес: {user.Adress}</Text>
            <Text>Пасспортные данные: {user.PassportId}</Text>
            <Text>Дата рождения: {user.DateOfBirth}</Text>
            <Text>
              Профессия: {user.ProfessionName_Profession.ProfessionName}
            </Text>
            <div>
              {isAuth && (isAuth.id === user.id || isAuth.role === 1) && (
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
                        user.MiddleName !== null ? user.MiddleName + ' ' : ''
                      }${user.SecondName}`,
                    })
                  }
                >
                  Изменить
                </Button>
              )}
            </div>
          </Div>
        )}
      </PullToRefresh>
    </Panel>
  );
};

export default User;
