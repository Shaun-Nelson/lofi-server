import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Request, Response, NextFunction } from 'express';

import { HttpError } from '../../utils/errors';
import * as loggerModule from '../../utils/logger';

import { errorHandler } from '../../middlewares/errorHandler.middleware';

// Mock the logger
jest.mock('../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

describe('errorHandler middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    mockRes = { status: statusMock as unknown as Response["status"] };
    jest.clearAllMocks();
  });

  it('should handle HttpError with status and message', () => {
    const error = new HttpError(404, 'Resource not found');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Resource not found',
      details: undefined,
    });
  });

  it('should handle HttpError with details', () => {
    const details = { field: 'email', reason: 'invalid format' };
    const error = new HttpError(400, 'Validation failed', details);

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Validation failed',
      details,
    });
  });

  it('should handle generic Error as 500', () => {
    const error = new Error('Something went wrong');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      details: undefined,
    });
  });

  it('should log 500+ errors with logger.error', () => {
    const error = new HttpError(500, 'Server error');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.error).toHaveBeenCalledWith(error);
    expect(loggerModule.logger.warn).not.toHaveBeenCalled();
  });

  it('should log 4xx errors with logger.warn', () => {
    const details = { info: 'test' };
    const error = new HttpError(400, 'Bad request', details);

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.warn).toHaveBeenCalledWith('[400] Bad request', details);
    expect(loggerModule.logger.debug).toHaveBeenCalledWith(error);
    expect(loggerModule.logger.error).not.toHaveBeenCalled();
  });

  it('should log 401 errors with logger.warn', () => {
    const error = new HttpError(401, 'Unauthorized');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.warn).toHaveBeenCalledWith('[401] Unauthorized', undefined);
    expect(loggerModule.logger.debug).toHaveBeenCalledWith(error);
  });

  it('should log 403 errors with logger.warn', () => {
    const error = new HttpError(403, 'Forbidden');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.warn).toHaveBeenCalledWith('[403] Forbidden', undefined);
    expect(loggerModule.logger.error).not.toHaveBeenCalled();
  });

  it('should log 404 errors with logger.warn', () => {
    const error = new HttpError(404, 'Not found');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.warn).toHaveBeenCalledWith('[404] Not found', undefined);
  });

  it('should log generic errors with logger.error', () => {
    const error = new Error('Unexpected error');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.error).toHaveBeenCalledWith(error);
  });

  it('should handle edge case with exactly 500 status', () => {
    const error = new HttpError(500, 'Server error');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.error).toHaveBeenCalledWith(error);
    expect(statusMock).toHaveBeenCalledWith(500);
  });

  it('should handle edge case with exactly 499 status', () => {
    const error = new HttpError(499, 'Client closed request');

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(loggerModule.logger.warn).toHaveBeenCalled();
    expect(loggerModule.logger.error).not.toHaveBeenCalled();
  });

  it('should send proper JSON response structure', () => {
    const error = new HttpError(418, "I'm a teapot");

    errorHandler(error, mockReq as Request, mockRes as Response);

    expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.any(String),
    }));
  });
});
