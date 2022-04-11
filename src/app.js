import * as yup from 'yup';
import initView from './view.js';

const validateValue = (value) => {
  const schema = yup
    .string()
    .trim()
    .required()
    .url()
    .matches(/(\.rss|\.xml)$/);

  return schema.validate(value);
};

export default () => {
  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('.btn-form'),
    feedback: document.querySelector('.feedback'),
  };

  const state = {
    links: [],
    errorApp: '',
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

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const valueUser = formData.get('url');

    validateValue(valueUser).then((link) => {
      console.log(link);
      if (state.links.includes(link)) {
        console.log(state);
        initView(state, elements).form.fields.name = {
          message: 'RSS уже существует',
          valid: false,
        };
      } else {
        initView(state, elements).links.push(link);
        initView(state, elements).form.fields.name = {
          message: 'RSS успешно загружен',
          valid: true,
        };
      }
    }).catch((err) => {
      console.log(err.message);
      initView(state, elements).form.fields.name = {
        message: err.message,
        valid: false,
      };
    });

    console.log(state);
  });
};
