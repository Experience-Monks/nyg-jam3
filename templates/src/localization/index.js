import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ReduxDetector from 'i18next-redux-languagedetector';
import Backend from 'i18next-chained-backend';
import Fetch from 'i18next-fetch-backend';

const LngDetector = new LanguageDetector();
LngDetector.addDetector(ReduxDetector);

export default function configureI18n({ i18nextConfig, redux }) {
  i18n
    .use(Backend)
    .use(LngDetector)
    .use(reactI18nextModule)
    .init({
      backend: {
        backends: [Fetch],
        backendOptions: [
          {
            loadPath: '/json/locales/{{lng}}/{{ns}}.json'
          }
        ]
      },
      detection: {
        // order and from where user language should be detected
        // order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

        lookupRedux: redux.lookupRedux,
        cacheUserLanguageRedux: redux.cacheUserLanguageRedux,

        // cache user language on
        // caches: ['localStorage', 'cookie'],
        caches: ['redux'],
        excludeCacheFor: ['cimode'] // languages to not persist (cookie, localStorage)

        // optional expire and domain for set cookie
        // cookieMinutes: 10,
        // cookieDomain: 'myDomain',

        // optional htmlTag with lang attribute, the default is:
        // htmlTag: document.documentElement
      },

      whitelist: i18nextConfig.whitelist,
      fallbackLng: i18nextConfig.fallbackLng,
      ns: i18nextConfig.ns,
      defaultNS: i18nextConfig.defaultNS,
      debug: process.env.NODE_ENV !== 'production',
      interpolation: {
        escapeValue: false
      },
      react: {
        wait: false
      }
    });

  return i18n;
}
