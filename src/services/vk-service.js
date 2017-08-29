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

export const vkApiTimeout = async (method, params, time, timeoutError = 5000) => {
  for(let i = 0; i < 5; i++) {
    let result = await vkApiTimeoutRequest(method, params, time, timeoutError);
    if(result !== 'timeout') {
      return new Promise((resolve) => {
        resolve(result);
      });
    }
  }

  return new Promise((resolve, reject) => {
    reject(`Timeout error (${timeoutError*5/100}s)`);
  })
};

const vkApiTimeoutRequest = (method, params, time, timeoutError) => {
  let timerId;

  let requestPromise = new Promise((resolve) => {
    setTimeout(() => {
      VK.api(method, params, (response) => {
        clearTimeout(timerId);
        testResponse(response);
        resolve(response);
      })
    }, time);
  });

  let timeoutPromise = new Promise((resolve) => {
    timerId = setTimeout(() => {
      console.warn('timeout');
      resolve('timeout');
    }, timeoutError)
  });

  return Promise.race([requestPromise, timeoutPromise])
};
