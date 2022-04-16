import onChange from 'on-change';
import renderMessage from './render/renderMessage.js';
import renderStatusForm from './render/renderStatusForm.js';
import renderFids from './render/renderFids.js';
import renderPosts from './render/renderPosts.js';
import renderUpdatePost from './render/renderUpdatePost.js';

export default (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.fields.name':
        renderMessage(state, elements);
        break;

      case 'form.processState':
        renderStatusForm(value, elements);
        break;

      case 'fids':
        renderFids(value, elements);
        break;

      case 'posts':
        renderPosts(state, value, elements);
        break;

      case 'updatePost':
        renderUpdatePost(value);
        break;

      default:
        break;
    }
  });

  return watchedState;
};
