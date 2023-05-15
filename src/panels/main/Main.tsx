import React, { useEffect, useState } from 'react';
import { Button, Card, Div, Panel, Text } from '@vkontakte/vkui';
import { IPanel } from 'interfaces/IPanel';
import { useRouter } from '@happysanta/router';
import './Main.css';
import RightInfo from '../../components/rightInfo/RightInfo';
import { useRecoilValue } from 'recoil';
import { authAtom, userAtom } from '../../state';
import {
  Icon24BrainOutline,
  Icon36Users3Outline,
  Icon56UserCircleOutline,
  Icon56WriteOutline,
  Icon56ArticleOutline,
} from '@vkontakte/icons';
import {
  MODAL_USER_INFO,
  PAGE_LECTIONS,
  PAGE_RESULTS,
  PAGE_TASKS,
  PAGE_USER,
  PAGE_USERS,
} from '../../router';
import { useLocalStorage } from 'usehooks-ts';
import { UsersAttributes } from '../../interfaces/UsersAttributes';
import { ProfessionAttributes } from '../../interfaces/ProfessionAttributes';

interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}

const Main = ({ id }: IPanel): JSX.Element => {
  const router = useRouter();
  const [userId] = useLocalStorage('userId', 0);
  const [user, setUser] = useState<extUsers>();
  const [isAuth] = useLocalStorage<any>('isAuth', false);

  const getUser = async () => {
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
      <h1 className={'main__header'}>Главная страница </h1>
      <div style={{ marginTop: 150 }}>
        <div className={'main__wrapper'}>
          <div className={'main__wrapper__2'}>
            <Card className={'main__card'}>
              <Icon24BrainOutline
                width={120}
                height={120}
                className={'main__cell__icons'}
              />
              <Text className={'main__cell__text'}> Результаты</Text>
              <Button
                className={'main__button'}
                onClick={() => router.pushPage(PAGE_RESULTS)}
              >
                Посмотреть
              </Button>
            </Card>
            {isAuth && isAuth.role === 1 && (
              <Card className={'main__card'}>
                <Icon36Users3Outline
                  width={120}
                  height={120}
                  className={'main__cell__icons'}
                />
                <Text className={'main__cell__text'}> Пользователи</Text>
                <Button
                  className={'main__button'}
                  onClick={() => router.pushPage(PAGE_USERS)}
                >
                  Посмотреть
                </Button>
              </Card>
            )}
          </div>
        </div>
        <div className={'main__wrapper'}>
          <div className={'main__wrapper__2'}>
            <Card className={'main__card'}>
              <Icon56UserCircleOutline
                width={120}
                height={120}
                className={'main__cell__icons'}
              />
              <Text className={'main__cell__text'}> Профиль</Text>
              <Button
                className={'main__button'}
                onClick={() => router.pushModal(MODAL_USER_INFO)}
              >
                Посмотреть
              </Button>
            </Card>
            <Card className={'main__card'}>
              <Icon56WriteOutline
                width={120}
                height={120}
                className={'main__cell__icons'}
              />
              <Text className={'main__cell__text'}> Задания</Text>
              <Button
                className={'main__button'}
                onClick={() => router.pushPage(PAGE_TASKS)}
              >
                Посмотреть
              </Button>
            </Card>
            <Card className={'main__card'}>
              <Icon56ArticleOutline
                width={120}
                height={120}
                className={'main__cell__icons'}
              />
              <Text className={'main__cell__text'}> Лекции</Text>
              <Button
                className={'main__button'}
                onClick={() => router.pushPage(PAGE_LECTIONS)}
              >
                Посмотреть
              </Button>
            </Card>
          </div>
        </div>
      </div>
      {user && (
        <RightInfo
          Name={`${user.FirstName + ' '} ${user.SecondName} ${user.MiddleName}`}
        />
      )}
    </Panel>
  );
};

export default Main;
