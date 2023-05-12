import React, { useEffect, useState } from 'react';
import { IPanel } from '../../interfaces/IPanel';
import { useLocalStorage } from 'usehooks-ts';
import { useRouter } from '@happysanta/router';
import { UsersAttributes } from '../../interfaces/UsersAttributes';
import { ProfessionAttributes } from '../../interfaces/ProfessionAttributes';
import {
  CustomSelect,
  Div,
  FormItem,
  Panel,
  PanelHeader,
  Select,
  Text,
} from '@vkontakte/vkui';
import RightInfo from '../../components/rightInfo/RightInfo';
import './Lections.css';
import {
  Icon24UserCircleOutline,
  Icon28ChevronLeftOutline,
} from '@vkontakte/icons';
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}
const Lections = ({ id }: IPanel): JSX.Element => {
  const [user, setUser] = useState<extUsers>();
  const [userId] = useLocalStorage('userId', 0);
  const router = useRouter();

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
    <Panel>
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
        Лекции
      </PanelHeader>
      <Div className={'results__list__wrapper'}>
        <div className={'lections__list__card'}>
          <a
            className={'lections__button'}
            href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=446793#khAm1eT2BJ7PefUq"
          >
            Лекция 1
          </a>
          <a
            className={'lections__button'}
            href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=446785&dst=100001#4pns1eTsrLeQXJz01"
          >
            Лекция 2
          </a>
          <a
            className={'lections__button'}
            href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=446691#jZ5t1eTA1poVl4V9"
          >
            Лекция 3
          </a>
          <a
            className={'lections__button'}
            href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=446800#bwFt1eTonvdI8XVm"
          >
            Лекция 4
          </a>
          <a
            className={'lections__button'}
            href="https://www.consultant.ru/cons/cgi/online.cgi?req=doc&base=LAW&n=446665#MJMt1eTkawsgOG0w"
          >
            Лекция 5
          </a>
        </div>
      </Div>

      {user && (
        <RightInfo
          Name={`${user.FirstName + ' '} ${user.SecondName} ${user.MiddleName}`}
        />
      )}
    </Panel>
  );
};

export default Lections;
