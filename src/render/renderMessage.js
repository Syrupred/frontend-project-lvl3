const renderMessage = (state, elements, i18nextInstance) => {
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
  elements.feedback.textContent = i18nextInstance.t(state.form.fields.name.message);
};

export default renderMessage;
