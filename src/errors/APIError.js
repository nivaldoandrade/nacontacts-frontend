class APIError extends Error {
  constructor(response, body) {
    super();

    this.response = response;
    this.body = body;
    this.message = body?.error ?? `${response.status} - ${response.statusText}`;
    this.name = 'APIError';
  }
}

export default APIError;
