import * as yup from 'yup';

const validateValue = (value, state) => {
  yup.setLocale({
    mixed: {
      required: () => 'notEmpty',
      notOneOf: () => 'duplication',
    },
    string: {
      url: () => 'invalidUrl',
    },

  });

  const schema = yup
    .string()
    .trim()
    .required()
    .url()
    .notOneOf(state.links);

  return schema.validate(value);
};

export default validateValue;
