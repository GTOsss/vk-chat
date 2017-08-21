class ErrorVkResponse {
  constructor({error: {error_code, error_msg}}) {
    console.error(`---> VK API Error ${error_code}: ${error_msg}`);
    this.message = 'Ошибка при обращении к VK API';
    this.vkErrorCode = error_code;
    this.vkErrorMsg = error_msg;
  }
}

export const testResponse = (resp) => {
  if (resp.error) {
    throw new ErrorVkResponse(resp);
  }
};

export const vkApi = (method, params) => {
  return new Promise((resolve) => {
    VK.api(method, params, (response) => {
         testResponse(response);
         resolve(response);
    });
  })
};

export const vkApiTimeout = (method, params, time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      VK.api(method, params, (response) => {
        testResponse(response);
        resolve(response);
      })
    }, time);
  })
};