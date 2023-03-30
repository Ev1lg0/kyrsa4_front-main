import React from 'react';
import ReactDOM from 'react-dom';
import { BridgePlus } from '@happysanta/bridge-plus'
import App from './App';
import { RouterContext } from '@happysanta/router';
import { router } from './router';
import { RecoilRoot } from 'recoil';


// Init VK  Mini App
BridgePlus.init();

/**
 * <p>Инициализируем Sentry</p>
 * <p>Не забудьте добавить DNS ссылку в .env файл!</p>
 * <p>Найти ссылку можно по пути: </p>
 * <p>[Проект] > Settings > Client Keys (DSN)</p>
 * {@link sentry.io}
 */
const InitSentry = async (): Promise<void> => {
  const Sentry = await import("@sentry/react");
  const { BrowserTracing } = await import("@sentry/tracing");
  let tracesSampleRate;
  if (process.env.NODE_ENV === 'development') {
    tracesSampleRate = 1.0;
  } else {
    tracesSampleRate = 0.25;
  }
  Sentry.init({
    dsn: process.env.errorTracingDns,
    integrations: [new BrowserTracing()],
    tracesSampleRate: tracesSampleRate,
  });
}
if (process.env.useErrorTracing) {
  InitSentry()
}

ReactDOM.render(
  <RouterContext.Provider value={router}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
  </RouterContext.Provider>,
document.getElementById('root'));

/**
 Включает консоль eruda при разработке и выключает консоль при деплое
*/
const configureConsole = (): void => {
  if (process.env.NODE_ENV === 'development') {
    import('./eruda').then(({default: eruda}) => {
    }); // runtime download
  } else {
    const methods: string[] = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ]
    methods.forEach(method => {
        // @ts-ignore
        console[method] = function () {
        } // disable console method
      }
    )
  }
}

configureConsole();
