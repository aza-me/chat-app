export interface ResponseTemplate<T> {
  data?: T;
  messages?: Record<string, string>;
  success?: boolean;
}

const responseTemplate = <T>({ data, success = true, ...rest }: ResponseTemplate<T>): ResponseTemplate<T> => {
  const response = {
    data,
    success,
    ...rest,
  };

  for (const key in response) {
    if (response[key] === undefined || response[key] === null) {
      delete response[key];
    }
  }

  return response;
};

export default responseTemplate;
