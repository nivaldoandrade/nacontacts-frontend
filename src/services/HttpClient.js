import APIError from '../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      signal: options?.signal
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      data: options?.body,
      headers: options?.headers
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      data: options?.body,
      headers: options?.headers
    });
  }

  async delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers
    });
  }

  async makeRequest(path, options) {
    const responseHeaders = new Headers();

    if (options.data) {
      responseHeaders.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        responseHeaders.append(key, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.data),
      headers: responseHeaders,
      signal: options.signal
    });

    let responseBody = null;

    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, responseBody);
    }

    return responseBody;
  }
}

export default HttpClient;
