export interface ResponseTemplate<T = unknown> {
  data?: T | null;
  success?: boolean;
  [key: string]: any;
}

export const responseTemplate = <T = unknown>({
  data,
  success = true,
  ...rest
}: ResponseTemplate<T>): ResponseTemplate<T> => {
  const obj: ResponseTemplate<T> = {
    data: data ?? null,
    success,
    ...rest,
  };

  if (!data) delete obj.data;

  return obj;
};
