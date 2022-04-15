import axios from 'axios';
import i18next from 'i18next';
import initView from './view.js';
import resources from './locales/index.js';
import parser from './parser.js';
import validateValue from './validateValue.js';

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('.btn-form'),
    feedback: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
  };

  const state = {
    lng: 'ru',
    links: [],
    posts: [],
    fids: [],
    form: {
      processState: '',
      fields: {
        name: {
          message: null,
          valid: true,
        },
      },
    },
  };

  const watchedState = initView(state, elements);

  const routes = {
    usersPath: (value) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`,
  };

  const getPostUpdate = () => {
    setTimeout(() => {
      const promises = state.links.map((link) => axios.get(routes.usersPath(link)));
      const promise = Promise.all(promises);
      return promise.then((contents) => {
        const arr = contents.flatMap((response) => {
          const rssData = parser(response.data.contents);
          const { posts } = rssData;
          return posts;
        });
        return arr;
      }).then((arr) => {
        watchedState.posts = arr;
      }).then(() => getPostUpdate());
    }, 5000);
  };
  getPostUpdate();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const valueUser = formData.get('url');

    validateValue(valueUser, i18nextInstance).then((link) => {
      if (state.links.includes(link)) {
        watchedState.form.processState = 'failed';
        watchedState.form.fields.name = {
          message: i18nextInstance.t('duplication'),
          valid: false,
        };
      } else {
        watchedState.form.processState = 'loading';
      }
    }).catch((err) => {
      watchedState.form.processState = 'failed';
      watchedState.form.fields.name = {
        message: err.message,
        valid: false,
      };
    }).then(() => {
      if (state.form.processState === 'loading') {
        axios.get(routes.usersPath(valueUser)).then((response) => {
          const rssData = parser(response.data.contents);
          if (rssData === 'errorNode') {
            watchedState.form.processState = 'failed';
            watchedState.form.fields.name = {
              message: i18nextInstance.t('invalidRss'),
              valid: false,
            };
          } else {
            watchedState.fids.push(rssData.fid);
            watchedState.posts.push(...rssData.posts);
            watchedState.links.push(valueUser);
            watchedState.form.processState = 'sent';
            watchedState.form.fields.name = {
              message: i18nextInstance.t('sent'),
              valid: true,
            };
          }
        }).catch((err) => {
          console.log(err);
          watchedState.form.processState = 'failed';
          watchedState.form.fields.name = {
            message: i18nextInstance.t('failed'),
            valid: false,
          };
        });
      }
    });
  });
};
