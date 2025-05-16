const OnSetFormData = (value) => {
  const formData = new FormData();
  const keys = Object.keys(value);

  keys.forEach((key) => {
    const item = value[key];
    formData.append(key, item);
  });

  return formData;
};

export default OnSetFormData;
