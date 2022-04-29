import axios from 'axios';
import i18next from 'i18next';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
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
    modal: document.getElementById('modal'),
  };

  const state = {
    lng: 'ru',
    links: [],
    posts: [],
    feeds: [],
    postsRead: [],
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

  const watchedState = initView(state, elements, i18nextInstance);

  const routes = {
    usersPath: (value) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(value)}`,
  };

  const addId = (posts) => posts.map((post) => ({ ...post, id: uuidv4() }));

  const getPostUpdate = () => {
    setTimeout(() => {
      const promises = state.links.map((link) => axios.get(routes.usersPath(link)));
      const promise = Promise.all(promises);
      return promise.then((contents) => {
        const allPosts = contents.flatMap((response) => {
          const rssData = parser(response.data.contents);
          const { posts } = rssData;
          return posts;
        });
        return allPosts;
      }).then((allPosts) => {
        // eslint-disable-next-line max-len
        const updatePosts = allPosts.filter(({ title, link }) => !(_.some(state.posts, { title, link })));
        if (updatePosts.length > 0) {
          const posts = addId(updatePosts);
          watchedState.posts.unshift(...posts);
        }
      }).finally(() => getPostUpdate());
    }, 5000);
  };
  getPostUpdate();

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const valueUser = formData.get('url');

    validateValue(valueUser, state.links)
      .then(() => {
        watchedState.form.processState = 'loading';
        return axios.get(routes.usersPath(valueUser));
      })
      .then((response) => {
        const rssData = parser(response.data.contents);
        watchedState.feeds.unshift(rssData.feed);
        const posts = addId(rssData.posts);
        watchedState.posts.unshift(...posts);
        state.links.unshift(valueUser);
        watchedState.form.processState = 'sent';
        watchedState.form.fields.name = {
          message: 'sent',
          valid: true,
        };
      })
      .catch((err) => {
        watchedState.form.processState = 'failed';
        watchedState.form.fields.name = {
          message: err.message,
          valid: false,
        };
      });
  });
};
