const renderStatusForm = (value, elements) => {
  const elInput = elements.input;
  const elButton = elements.button;
  switch (value) {
    case 'sent':
      elButton.removeAttribute('disabled');
      elInput.readOnly = false;
      elInput.value = '';
      elInput.focus();
      break;

    case 'failed':
      elButton.removeAttribute('disabled');
      elInput.readOnly = false;
      break;

    case 'loading':
      elButton.setAttribute('disabled', true);
      elInput.readOnly = true;
      break;

    default:
      throw Error(`Unknown form status: ${value}`);
  }
};

export default renderStatusForm;
