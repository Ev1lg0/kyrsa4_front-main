import { Button, Panel, PanelHeader } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import Menu from '../../components/menu/Menu';
import { IPanel } from '../../interfaces/IPanel';
import { TaskAttributes } from '../../interfaces/TaskAttributes';
import { useParams, useRouter } from '@happysanta/router';
import Task from 'components/task/Task';
import { Icon28ChevronLeftOutline } from '@vkontakte/icons';
import { MODAL_TEST_GRADE } from 'router';
import { useLocalStorage } from 'usehooks-ts';
import './Tasks.css';
import { UsersAttributes } from '../../interfaces/UsersAttributes';
import { ProfessionAttributes } from '../../interfaces/ProfessionAttributes';
import RightInfo from '../../components/rightInfo/RightInfo';

interface extUsers extends UsersAttributes {
  ProfessionName_Profession: ProfessionAttributes;
}
const Tasks = ({ id }: IPanel): JSX.Element => {
  const [tasks, setTasks] = useState<TaskAttributes[]>();
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [user, setUser] = useState<extUsers>();
  const [userId] = useLocalStorage('userId', 0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isAuth] = useLocalStorage<any>('isAuth', false);
  const onCheckAnswerHandler = (answer: any) => {
    const indexOrNoneExists = selectedAnswers
      .map((x) => x.id)
      .indexOf(answer.id);
    if (indexOrNoneExists === -1) {
      setSelectedAnswers((prevState) => [...prevState, answer]);
    } else {
      const prevAnswers = [...selectedAnswers];
      prevAnswers[indexOrNoneExists] = answer;
      setSelectedAnswers(prevAnswers);
    }
  };
  const submit = async () => {
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/tasks/submit`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submit: selectedAnswers, UserId: isAuth.id }),
    }).then(async (response) => {
      const data = await response.json();
      router.pushModal(MODAL_TEST_GRADE, { grade: data.grade + '' });
    });
  };

  const router = useRouter();
  const getTasks = async () => {
    await fetch(`https://Kyrsa4back.ev1lg0.repl.co/api/tasks`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const data = await response.json();
      setTasks(data);
    });
  };

  useEffect(() => {
    getTasks();
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

  // @ts-ignore
  return (
    <Panel id={id}>
      <PanelHeader
        className={'tasks__header'}
        separator={false}
        before={
          <Icon28ChevronLeftOutline
            onClick={() => router.popPage()}
            style={{ color: '#4BB34B', marginTop: 3 }}
          />
        }
      >
        Задания
      </PanelHeader>
      {tasks &&
        tasks.map((task: TaskAttributes, index: number) => (
          <Task task={task} index={index} onClick={onCheckAnswerHandler} />
        ))}{' '}
      {tasks && (
        <Button
          className={'tasks__button'}
          disabled={tasks.length != selectedAnswers.length}
          onClick={submit}
        >
          Завершить тест
        </Button>
      )}
      {user && (
        <RightInfo
          Name={`${user.FirstName + ' '} ${user.SecondName} ${user.MiddleName}`}
        />
      )}
    </Panel>
  );
};

export default Tasks;
