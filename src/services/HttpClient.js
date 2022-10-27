import delay from '../utils/delay';

import APIError from '../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(1500);

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;

    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, body);
    }

    return body;
  }

  async post(path, data) {
    await delay(200);

    const responseHeaders = new Headers({
      'Content-Type': 'application/json'
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: responseHeaders
    });

    let responseBody = null;

    const contentType = response.headers.get('content-type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, responseBody);
    }

    return responseBody;
  }
}

export default HttpClient;
