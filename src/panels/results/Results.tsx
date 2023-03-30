import { Div, Panel, PanelHeader, Text } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/Menu';
import { IPanel } from '../../interfaces/IPanel';
import { useParams, useRouter } from '@happysanta/router';
import { ResultsAttributes } from '../../interfaces/ResultsAttributes';
import { UsersAttributes } from '../../interfaces/UsersAttributes';
import { DirectionAttributes } from '../../interfaces/DirectionAttributes';
import {
  Icon24UserCircleOutline,
  Icon28ChevronLeftOutline,
} from '@vkontakte/icons';
import RightInfo from '../../components/rightInfo/RightInfo';
import { ProfessionAttributes } from '../../interfaces/ProfessionAttributes';
import { useLocalStorage } from 'usehooks-ts';
import './Results.css';

interface bestResults {
  id: number;
  Grade: number;
  FirstName: string;
  SecondName: string;
  MiddleName: string;
  DirectionName: string;
}
interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}

const Results = ({ id }: IPanel): JSX.Element => {
  const [results, setResults] = useState<bestResults[]>();
  const [user, setUser] = useState<extUsers>();
  const [userId] = useLocalStorage('userId', 0);
  const router = useRouter();
  const getResults = async () => {
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/results/`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();
      console.log(data);
      setResults(data);
    });
  };

  useEffect(() => {
    getResults();
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
        Результаты
      </PanelHeader>
      {results &&
        results.map((result) => (
          <Div className={'results__list__wrapper'}>
            <div className={'results__list__card'}>
              <Icon24UserCircleOutline
                width={80}
                height={80}
                style={{
                  position: 'absolute',
                  color: '#4BB34B',
                  left: '60px',
                }}
              />
              <h1>{`${result.SecondName} ${result.FirstName} ${result.MiddleName}`}</h1>
              <Text>Название курса: {result.DirectionName}</Text>
              <Text>Оценка: {result.Grade}</Text>
            </div>
          </Div>
        ))}
      {user && (
        <RightInfo
          Name={`${user.FirstName + ' '} ${user.SecondName} ${user.MiddleName}`}
        />
      )}
    </Panel>
  );
};

export default Results;
