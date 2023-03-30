import { Page, Router } from '@happysanta/router';
// region PAGES
export const PAGE_MAIN: string = '/';
export const PAGE_USERS: string = '/users';
export const PAGE_USER: string = '/user/:id([0-9]+)';
export const PAGE_AUTH: string = '/auth';
export const PAGE_ONBOARDING: string = '/onboarding';
export const PAGE_RESULTS: string = '/results';
export const PAGE_TASKS: string = '/tasks';
// endregion

// region PANELS
export const PANEL_MAIN: string = 'panel_main';
export const PANEL_USERS: string = 'panel_users';
export const PANEL_USER: string = 'panel_user';
export const PANEL_RESULTS: string = 'panel_results';
export const PANEL_AUTH: string = 'panel_auth';
export const PANEL_ONBOARDING: string = 'panel_onboarding';
export const PANEL_TASKS: string = 'panel_tasks';
// endregion

// region MODALS
export const MODAL_TEST_GRADE: string = 'modal_test_grade';
export const MODAL_AUTH_DECLINE: string = 'modal_auth_decline';
export const MODAL_AUTH_SUCCESS: string = 'modal_auth_success';
export const MODAL_CREATE_DECLINE: string = 'modal_create_decline';
export const MODAL_DELETE_DECLINE: string = 'modal_delete_decline';
export const MODAL_UPDATE_DECLINE: string = 'modal_update_decline';
export const MODAL_CREATE_SUCCESS: string = 'modal_create_success';
export const MODAL_UPDATE_SUCCESS: string = 'modal_update_success';
export const MODAL_CREATE_USER: string = 'modal_create_user';
export const MODAL_UPDATE_USER: string = 'modal_update_user';
export const MODAL_USER_INFO: string = 'modal_user_info';
export const MODAL_INFO: string = 'modal_info';
// endregion

// region POPOUTS
export const POPOUT_TEMPLATE: string = 'popout_template';
// endregion

// region VIEWS
export const VIEW_MAIN: string = 'view_main';
export const VIEW_ONBOARDING: string = 'view_onboarding';
// endregion

const routes = {
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
  [PAGE_USERS]: new Page(PANEL_USERS, VIEW_MAIN),
  [PAGE_USER]: new Page(PANEL_USER, VIEW_MAIN),
  [PAGE_AUTH]: new Page(PANEL_AUTH, VIEW_MAIN),
  [PAGE_ONBOARDING]: new Page(PANEL_ONBOARDING, VIEW_ONBOARDING),
  [PAGE_RESULTS]: new Page(PANEL_RESULTS, VIEW_MAIN),
  [PAGE_TASKS]: new Page(PANEL_TASKS, VIEW_MAIN),
};

export const router = new Router(routes);
router.start();
