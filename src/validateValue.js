import * as yup from 'yup';

const validateValue = (value, links) => {
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
    .notOneOf(links);

  return schema.validate(value);
};

export default validateValue;
