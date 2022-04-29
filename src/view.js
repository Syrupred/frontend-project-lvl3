import onChange from 'on-change';
import renderMessage from './render/renderMessage.js';
import renderStatusForm from './render/renderStatusForm.js';
import renderFeeds from './render/renderFeeds.js';
import renderPosts from './render/renderPosts.js';

export default (state, elements, i18nextInstance) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.fields.name':
        renderMessage(state, elements, i18nextInstance);
        break;

      case 'form.processState':
        renderStatusForm(value, elements);
        break;

      case 'feeds':
        renderFeeds(value, elements, i18nextInstance);
        break;

      case 'posts':
        renderPosts(state, value, elements, i18nextInstance);
        break;

      default:
        throw new Error(`Unknown path: '${path}'!`);
    }
  });

  return watchedState;
};
