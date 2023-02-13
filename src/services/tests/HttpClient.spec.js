/* eslint-disable jest/no-conditional-expect */
/* eslint-disable global-require */
import APIError from '../../errors/APIError';
import HttpClient from '../HttpClient';

describe('HttpClient', () => {
  let httpClient;
  const baseURL = 'http://api.nacontacts.com';

  beforeEach(() => {
    httpClient = new HttpClient(baseURL);
  });

  it('should make a GET request', async () => {
    const responseJson = { id: 1, name: 'Jonh Doe' };

    const mockResponse = {
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('application/json')
      },
      json: jest.fn().mockReturnValue(responseJson)
    };
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve(mockResponse));

    const path = '/test';
    const response = await httpClient.get(path);

    expect(response).toEqual(responseJson);
    expect(global.fetch).toHaveBeenCalledWith(`${baseURL}${path}`, {
      method: 'GET',
      headers: new Headers()
    });
  });

  it('should make a POST request', async () => {
    const responseJson = { id: 1, name: 'Jonh Doe' };

    const mockResponse = {
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('application/json')
      },
      json: jest.fn().mockReturnValue(responseJson)
    };
    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve(mockResponse));

    const path = '/test';
    const body = { test: 'body' };
    const headers = { Authorization: 'MyToken' };
    const response = await httpClient.post(path, {
      body,
      headers
    });

    expect(response).toEqual(responseJson);
    expect(global.fetch).toHaveBeenCalledWith(`${baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        ...headers
      })
    });
  });

  it('should make a PUT request', async () => {
    const responseJson = { id: 1, name: 'Jonh Doe' };

    const mockResponse = {
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('application/json')
      },
      json: jest.fn().mockReturnValue(responseJson)
    };

    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve(mockResponse));

    const path = '/test';
    const body = { id: 1, name: 'Jonh Doe' };
    const headers = {
      Authorization: 'MyToken'
    };
    const response = await httpClient.put(path, {
      body,
      headers
    });

    expect(response).toEqual(responseJson);
    expect(global.fetch).toHaveBeenCalledWith(`${baseURL}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: 'MyToken'
      })
    });
  });

  it('should make a DELETE request', async () => {
    const mockResponse = {
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue('')
      }
    };

    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve(mockResponse));

    const path = '/test';
    const headers = {
      Authorization: 'MyToken'
    };

    const response = await httpClient.delete(path, {
      headers
    });

    expect(response).toEqual(null);
    expect(global.fetch).toHaveBeenCalledWith(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: new Headers({
        ...headers
      })
    });
  });

  it('should throw an APIError if the response is not ok', async () => {
    const mockResponse = {
      ok: false,
      headers: {
        get: jest.fn().mockReturnValue('application/json')
      },
      json: jest.fn().mockReturnValue({})
    };

    global.fetch = jest.fn().mockReturnValueOnce(Promise.resolve(mockResponse));

    const path = '/test';

    try {
      await httpClient.get(path);
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect(error.response).toEqual(mockResponse);
      expect(error.body).toEqual({});
    }
  });
});
