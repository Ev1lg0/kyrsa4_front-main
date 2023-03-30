import React, { useState } from 'react';
import {
  Button,
  Div,
  Panel,
  PanelHeader,
  Text,
  FormLayout,
  FormItem,
  Input,
} from '@vkontakte/vkui';
import { IPanel } from 'interfaces/IPanel';
import { useRouter } from '@happysanta/router';
import {
  MODAL_AUTH_DECLINE,
  MODAL_AUTH_SUCCESS,
  PAGE_MAIN,
} from './../../router';
import { useLocalStorage } from 'usehooks-ts';
import './Auth.css';
import { Icon24UserCircleOutline } from '@vkontakte/icons';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../state';

const Auth = ({ id }: IPanel): JSX.Element => {
  const router = useRouter();
  const [, setIsAuth] = useLocalStorage('isAuth', false);
  const [, setUserId] = useLocalStorage('userId', 0);
  const setUser = useSetRecoilState(userAtom);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  //Авторизация
  const auth = async () => {
    const data = await fetch(`https://Kyrsa4back.ev1lg0.repl.co/auth`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Login: login, Password: password }),
    });
    // Если все данные верны
    if (data.ok) {
      const res = await data.json();
      console.log(`pedik ${res.id}`);
      setIsAuth(res);
      setUserId(res.id);

      router.replacePage(PAGE_MAIN);
      router.pushModal(MODAL_AUTH_SUCCESS);
    } else {
      router.pushModal(MODAL_AUTH_DECLINE);
    }
  };

  return (
    <Panel id={id}>
      <div className={'auth__wrapper'}>
        <Text className={'auth__company__name'}>
          «Антонов и партнеры»
          <br />
          адвокатскоe бюро
        </Text>
        <Text className={'auth__text__enter'}>Вход</Text>
        <Text className={'auth__text__toenter'}>
          Чтобы начать работу войдите в систему
        </Text>
        <FormLayout className={'auth__form'}>
          <Text
            style={{ fontSize: '24px', marginLeft: '10px', marginTop: '10px' }}
          >
            Вход в систему
          </Text>
          <FormItem
            top="Логин"
            status={login ? 'valid' : 'error'}
            bottom={!login && 'Введите логин'}
          >
            <Input
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </FormItem>

          <FormItem top="Пароль">
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <Button
              size="l"
              stretched
              onClick={auth}
              disabled={login.length === 0 && password.length === 0}
              style={{ backgroundColor: '#54ad32', top: '50px' }}
            >
              Войти
            </Button>
          </FormItem>
        </FormLayout>
      </div>
    </Panel>
  );
};

// @ts-ignore
export default Auth;
