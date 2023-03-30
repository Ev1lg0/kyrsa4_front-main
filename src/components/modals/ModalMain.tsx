import React from 'react';
import { useLocation, useRouter } from '@happysanta/router';
import { ModalRoot } from '@vkontakte/vkui';
import ModalInfo from './ModalInfo/ModalInfo';
import {
  MODAL_AUTH_DECLINE,
  MODAL_AUTH_SUCCESS,
  MODAL_CREATE_DECLINE,
  MODAL_CREATE_SUCCESS,
  MODAL_CREATE_USER,
  MODAL_DELETE_DECLINE,
  MODAL_INFO,
  MODAL_TEST_GRADE,
  MODAL_UPDATE_DECLINE,
  MODAL_UPDATE_SUCCESS,
  MODAL_UPDATE_USER,
  MODAL_USER_INFO,
} from 'router';
import ModalUpdateUser from './ModalsUser/ModalUpdateUser';
import ModalCreateUser from './ModalsUser/ModalCreateUser';
import ModalAuthDecline from './ModalsAuth/ModalAuthDecline';
import ModalSuccessAuth from './ModalsAuth/ModalSuccessAuth';
import ModalCreateDecline from './ModalsComments/ModalCreateDecline';
import ModalCreateSuccess from './ModalsComments/ModalCreateSuccess';
import ModalDeleteDecline from './ModalsComments/ModalDeleteDecline';
import ModalUpdateDecline from './ModalsComments/ModalUpdateDecline';
import ModalUpdateSuccess from './ModalsComments/ModalUpdateSuccess';
import ModalTestGrade from './ModalGrade/ModalGrade/ModalGrade';
import ModalUser from './ModalsUser/ModalUser';

const ModalMain = (): JSX.Element => {
  const location = useLocation();
  const router = useRouter();
  return (
    <ModalRoot
      activeModal={location.getModalId()}
      onClose={() => router.popPage()}
    >
      <ModalInfo id={MODAL_INFO} />
      <ModalUpdateUser id={MODAL_UPDATE_USER} />
      <ModalCreateUser id={MODAL_CREATE_USER} />
      <ModalAuthDecline id={MODAL_AUTH_DECLINE} />
      <ModalSuccessAuth id={MODAL_AUTH_SUCCESS} />
      <ModalCreateDecline id={MODAL_CREATE_DECLINE} />
      <ModalCreateSuccess id={MODAL_CREATE_SUCCESS} />
      <ModalDeleteDecline id={MODAL_DELETE_DECLINE} />
      <ModalUpdateDecline id={MODAL_UPDATE_DECLINE} />
      <ModalUpdateSuccess id={MODAL_UPDATE_SUCCESS} />
      <ModalTestGrade id={MODAL_TEST_GRADE} />
      <ModalUser id={MODAL_USER_INFO} />
    </ModalRoot>
  );
};

export default ModalMain;
