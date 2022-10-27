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
}

export default HttpClient;
