enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Data = Record<string, unknown>

type RequestOptions = {
  headers?: Record<string, string>
  method?: METHOD
  data?: Data
  timeout?: number
}

type HTTPMethod = (url: string, options?: RequestOptions) => Promise<unknown>

const queryStringify = (data: Data): string => {
  const keys = Object.keys(data);

  if (typeof data !== 'object') {
    throw new Error('Данные должны быть объектом');
  }

  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
};

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.GET }, options.timeout)
  )

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.POST }, options.timeout)
  )

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.PUT }, options.timeout)
  )

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHOD.DELETE }, options.timeout)
  )

  request = (url: string, options: RequestOptions = { method: METHOD.GET }, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method!,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url
      );
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
