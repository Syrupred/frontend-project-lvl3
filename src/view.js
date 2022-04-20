import onChange from 'on-change';
import renderMessage from './render/renderMessage.js';
import renderStatusForm from './render/renderStatusForm.js';
import renderFids from './render/renderFids.js';
import renderPosts from './render/renderPosts.js';
import renderUpdatePost from './render/renderUpdatePost.js';

export default (state, elements, i18nextInstance) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.fields.name':
        renderMessage(state, elements);
        break;

      case 'form.processState':
        renderStatusForm(value, elements);
        break;

      case 'fids':
        renderFids(value, elements, i18nextInstance);
        break;

      case 'posts':
        renderPosts(state, value, elements, i18nextInstance);
        break;

      case 'updatePost':
        renderUpdatePost(value, i18nextInstance, state, elements);
        break;

      default:
        break;
    }
  });

  return watchedState;
};
