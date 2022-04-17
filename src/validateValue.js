import * as yup from 'yup';

const validateValue = (value, i18nextInstance) => {
  yup.setLocale({
    mixed: {
      required: () => i18nextInstance.t('notEmpty'),
    },
    string: {
      url: () => i18nextInstance.t('invalidUrl'),
    },

  });

  const schema = yup
    .string()
    .trim()
    .required()
    .url();

  return schema.validate(value);
};

export default validateValue;
