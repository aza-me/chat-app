import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { HttpStatus } from '@nestjs/common';

interface ErrorData {
  status: boolean;
  statusCode: number;
  messages: Record<string, string>;
}

const prismaErrorHandler = (e: any) => {
  const data: ErrorData = {
    status: false,
    statusCode: HttpStatus.BAD_REQUEST,
    messages: {},
  };

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      data.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      data.messages = {
        [e.meta.target as string]: `${e.meta.target} already exists`,
      };
    }
  }

  return data;
};

export default prismaErrorHandler;
