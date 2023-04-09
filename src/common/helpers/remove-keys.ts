const removeKeys = <T>(data: T, keys: Array<keyof T>) => {
  keys.forEach((key) => {
    delete data[key];
  });

  return data;
};

export default removeKeys;
