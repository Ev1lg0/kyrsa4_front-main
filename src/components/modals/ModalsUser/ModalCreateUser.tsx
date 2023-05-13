import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  FormItem,
  FormLayout,
  Input,
  ModalCard,
  Select,
} from '@vkontakte/vkui';
import { IModal } from 'interfaces/IModal';
import { useRouter } from '@happysanta/router';
import { MODAL_CREATE_DECLINE, MODAL_CREATE_SUCCESS } from '../../../router';

const ModalCreateUser = ({ id }: IModal): JSX.Element => {
  const [Adress, setAdress] = useState('');
  const [PassportId, setPassportId] = useState('');
  const [FIO, setFIO] = useState('');
  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');
  const [Role, setRole] = useState(0);
  const [DateOfBirth, setDateOfBirth] = useState(new Date());
  const [ProfessionName, setProfessionName] = useState(0);
  const router = useRouter();

  const create = async () => {
    try {
      // Получение ФИО
      let FirstName, MiddleName, SecondName;
      if (FIO.split(' ').length === 2) {
        [FirstName, SecondName] = FIO.split(' ');
      } else {
        [SecondName, FirstName, MiddleName] = FIO.split(' ');
      }
      // Создание данных
      const data = await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/users/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Adress,
          PassportId,
          FirstName,
          MiddleName,
          SecondName,
          Login,
          Password,
          Role,
          DateOfBirth,
          ProfessionName,
        }),
      });
      // Закрытие модального окна
      if (data.ok) {
        router.replaceModal(MODAL_CREATE_SUCCESS);
      } else {
        router.replaceModal(MODAL_CREATE_DECLINE);
      }
    } catch (e) {
      router.replaceModal(MODAL_CREATE_DECLINE);
    }
  };

  return (
    <ModalCard id={id} header={'Создать'}>
      <FormLayout>
        <FormItem
          top="ФИО"
          status={FIO ? 'valid' : 'error'}
          bottom={!FIO && 'Введите ФИО'}
        >
          <Input
            type="text"
            name="FIO"
            value={FIO}
            onChange={(e) => setFIO(e.target.value)}
          />
        </FormItem>
        <FormItem
          top="Адрес"
          status={Adress ? 'valid' : 'error'}
          bottom={!Adress && 'Введите адрес'}
        >
          <Input
            type="text"
            name="Adress"
            value={Adress}
            onChange={(e) => setAdress(e.target.value)}
          />
        </FormItem>
        <FormItem top="Дата рождения">
          <DatePicker
            defaultValue={{
              day: DateOfBirth.getDate(),
              month: DateOfBirth.getMonth() + 1,
              year: DateOfBirth.getFullYear(),
            }}
            onDateChange={(value) => {
              const date = new Date();
              date.setDate(value.day);
              date.setMonth(value.month - 1);
              date.setFullYear(value.year);
              setDateOfBirth(date);
            }}
          />
        </FormItem>
        <FormItem
          top="Паспортные данные"
          bottom={!PassportId && 'Введите паспортные данные'}
          status={PassportId ? 'valid' : 'error'}
        >
          <Input
            type="text"
            placeholder="Введите паспортные данные"
            value={PassportId}
            onChange={(e) => setPassportId(e.target.value)}
          />
        </FormItem>
        <FormItem
          top="Роль 1 - администратор, 2 - пользователь"
          bottom={!Role && 'Введите роль пользователя'}
          status={Role > 0 ? 'valid' : 'error'}
        >
          <Input
            type="number"
            placeholder="Введите роль"
            value={Role}
            onChange={(e) => setRole(Number(e.target.value))}
          />
        </FormItem>
        <FormItem
          top="Профессия 1 - Юрист, 2 - Адвокат"
          bottom={!ProfessionName && 'Введите профессию пользователя'}
          status={ProfessionName > 0 ? 'valid' : 'error'}
        >
          <Input
            type="number"
            placeholder="Введите профессию"
            value={ProfessionName}
            onChange={(e) => setProfessionName(Number(e.target.value))}
          />
        </FormItem>
        <FormItem
          top="Логин"
          bottom={!Login && 'Введите логин пользователя'}
          status={Login ? 'valid' : 'error'}
        >
          <Input
            type="text"
            placeholder="Введите пользователя"
            value={Login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </FormItem>
        <FormItem
          top="Пароль"
          bottom={!Password && 'Пожалуйста, введите пароль'}
          status={Password ? 'valid' : 'error'}
        >
          <Input
            type="password"
            placeholder="Введите пароль"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Button
            style={{ background: '#00b536' }}
            size="l"
            stretched
            onClick={create}
            disabled={
              Adress.length === 0 ||
              PassportId.length === 0 ||
              Role <= 0 ||
              Login.length === 0 ||
              Password.length === 0
            }
          >
            Создать
          </Button>
        </FormItem>
      </FormLayout>
    </ModalCard>
  );
};

export default ModalCreateUser;
