import onChange from 'on-change';

const renderMessage = (state, elements) => {
  if (state.form.fields.name.valid) {
    elements.input.classList.remove('is-invalid');
  } else {
    elements.input.classList.add('is-invalid');
  }
  if (state.form.processState === 'sent') {
    elements.feedback.classList.add('text-success');
    elements.feedback.classList.remove('text-danger');
  } else {
    elements.feedback.classList.add('text-danger');
    elements.feedback.classList.remove('text-success');
  }
  // eslint-disable-next-line no-param-reassign
  elements.feedback.innerHTML = state.form.fields.name.message;
};

const renderStatusForm = (value, elements) => {
  const elInput = elements.input;
  const elButton = elements.button;
  switch (value) {
    case 'sent':
      elButton.removeAttribute('disabled');
      elInput.removeAttribute('disabled');
      elInput.value = '';
      elInput.focus();
      break;

    case 'failed':
      elButton.removeAttribute('disabled');
      elInput.removeAttribute('disabled');
      break;

    case 'loading':
      elButton.setAttribute('disabled', true);
      elInput.setAttribute('disabled', true);
      break;

    default:
      throw Error(`Unknown form status: ${value}`);
  }
};

export default (state, elements) => {
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'form.fields.name':
        renderMessage(state, elements);
        break;

      case 'form.processState':
        renderStatusForm(value, elements);
        break;

      default:
        break;
    }
  });

  return watchedState;
};
