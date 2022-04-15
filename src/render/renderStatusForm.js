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

export default renderStatusForm;
