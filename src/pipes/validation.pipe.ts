import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import responseTemplate from 'common/templates/responseTemplate';

export default new ValidationPipe({
  exceptionFactory: (errors) => {
    const errorMessages = {};

    errors.forEach((error) => {
      errorMessages[error.property] = Object.values(error.constraints).join('. ').trim();
    });

    return new UnprocessableEntityException(responseTemplate({ messages: errorMessages, success: false }));
  },
});
