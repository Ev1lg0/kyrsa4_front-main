import React, { ChangeEvent, useState } from 'react';
import { Div, FormItem, FormLayout, Radio } from '@vkontakte/vkui';
import { IPanel } from '../../interfaces/IPanel';
import { TaskAttributes } from '../../interfaces/TaskAttributes';
import './Task.css';
import {
  Icon24Help,
  Icon24HelpOutline,
  Icon24QuestionOutline,
} from '@vkontakte/icons';

interface Itask {
  task: TaskAttributes;
  index: number;
  onClick: (answer: any) => void;
}

const Task = ({ task, index, onClick }: Itask): JSX.Element => {
  const [checkedAnswer, setCheckedAnswer] = useState('');
  const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedAnswer(e.target.value);
    onClick({ id: task.id, checkedAnswer: e.target.value });
  };
  return (
    <Div className={'task__list__wrapper'}>
      <span className={'task__vopros'}>
        <Icon24HelpOutline
          style={{
            color: '#4BB34B',
            position: 'absolute',
            left: '-48px',
            bottom: '-2px',
          }}
        />
        Вопрос {index + 1}
      </span>
      <div className={'task__list__card'}>
        <h1 className={'task__question'}> {task.Question}</h1>
        <FormLayout>
          <FormItem>
            <Radio
              value="1"
              checked={checkedAnswer === '1'}
              onChange={onCheckHandler}
            >
              {`${task.Answer1}`}
            </Radio>
            <Radio
              value="2"
              checked={checkedAnswer === '2'}
              onChange={onCheckHandler}
            >
              {`${task.Answer2}`}
            </Radio>
            <Radio
              value="3"
              checked={checkedAnswer === '3'}
              onChange={onCheckHandler}
            >
              {`${task.Answer3}`}
            </Radio>
            <Radio
              value="4"
              checked={checkedAnswer === '4'}
              onChange={onCheckHandler}
            >
              {`${task.Answer4}`}
            </Radio>
          </FormItem>
        </FormLayout>
      </div>
    </Div>
  );
};

export default Task;
