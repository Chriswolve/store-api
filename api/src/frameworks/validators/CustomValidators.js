
export function validatePatch (value, helpers) {
  const fieldsProvided = Object.keys(value);
  const allFields = Object.keys(this);

  if (fieldsProvided.length >= allFields.length - 1) {
    return helpers.error('any.custom', {
      message: 'insteadPatch',
      path: fieldsProvided
    });
  }
  return value;
};

