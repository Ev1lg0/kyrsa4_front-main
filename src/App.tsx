import React, { useEffect, useState } from 'react';
import { BridgePlus } from '@happysanta/bridge-plus';
import { useLocation, useRouter } from '@happysanta/router';
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  usePlatform,
  Root,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {
  PAGE_ONBOARDING,
  PANEL_MAIN,
  PANEL_ONBOARDING,
  PANEL_AUTH,
  PAGE_AUTH,
  VIEW_MAIN,
  VIEW_ONBOARDING,
  PANEL_USER,
  PANEL_RESULTS,
  PANEL_TASKS,
  PANEL_USERS,
  PANEL_LECTIONS,
} from './router';

import Main from './panels/main/Main';
import Auth from './panels/auth/Auth';
import Popout from './components/popouts/PopoutMain';
import ModalMain from './components/modals/ModalMain';
import { AppearanceType } from '@vkontakte/vk-bridge';
import './App.css';
import { useLocalStorage } from 'usehooks-ts';
import Results from 'panels/results/Results';
import Task from './panels/tasks/Tasks';
import Users from './panels/user/Users/Users';
import User from './panels/user/User';
import Lections from './panels/lections/Lections';

const App = (): JSX.Element => {
  const [appearance, setAppearance] = useState(null);
  const [isAuth] = useLocalStorage('isAuth', false);

  const router = useRouter();
  const location = useLocation();
  const platform = usePlatform();

  const popout = Popout();
  const modal = ModalMain();

  useEffect(() => {
    const getTheme = async (): Promise<void> => {
      //@ts-ignore
      BridgePlus.subscribe('VKWebAppUpdateConfig', (data) => {
        // @ts-ignore
        if (data?.error_type !== 'auth_error') {
          // @ts-ignore
          setAppearance(data.appearance);
        }
      });
    };

    const ShowOnboarding = async (): Promise<void> => {
      const onboardingIsShowed = await BridgePlus.storageGetKey(
        'ONBOARDING_IS_SHOWED',
        'false'
      );
      if (onboardingIsShowed !== 'true') {
        router.replacePage(PAGE_ONBOARDING);
      }
    };
    getTheme();
    ShowOnboarding();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      router.replacePage(PAGE_AUTH);
    }
  }, [isAuth]);

  return (
    <ConfigProvider
      appearance={appearance as AppearanceType}
      platform={platform}
    >
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal} popout={popout}>
            <SplitCol>
              <Root activeView={location.getViewId()}>
                <View
                  id={VIEW_MAIN}
                  history={location.getViewHistory(VIEW_MAIN)}
                  activePanel={location.getViewActivePanel(VIEW_MAIN)}
                >
                  <Main id={PANEL_MAIN} />
                  <Auth id={PANEL_AUTH} />
                  <Users id={PANEL_USERS} />
                  <Results id={PANEL_RESULTS} />
                  <Task id={PANEL_TASKS} />
                  <User id={PANEL_USER} />
                  <Lections id={PANEL_LECTIONS} />
                </View>
                <View id={VIEW_ONBOARDING} activePanel={PANEL_ONBOARDING}>
                  <Main id={PANEL_ONBOARDING} />
                </View>
              </Root>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
