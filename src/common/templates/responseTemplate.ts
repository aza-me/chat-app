export interface ResponseTemplate<T> {
  data?: T;
  messages?: Record<string, string>;
  success?: boolean;
  statusCode: number;
}

const responseTemplate = <T>({
  data,
  success = true,
  statusCode,
  ...rest
}: ResponseTemplate<T>): ResponseTemplate<T> => {
  const response = {
    data,
    success,
    statusCode,
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
