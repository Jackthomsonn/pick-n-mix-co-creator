export class HttpClient {
  public static async get(url: string) {
    const response = await fetch(url);

    return Promise.resolve(await response.json());
  }

  public static async post(url: string, data: any, headers?: any) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: Object.assign({
        'Content-Type': 'application/json',
      }, headers)
    });

    return Promise.resolve(await response.json());
  }
}