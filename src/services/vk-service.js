class ErrorVkResponse {
  constructor({ error: { error_code: errorCode, error_msg } }) {
    console.error(`---> VK API Error ${errorCode}: ${errorCode}`);
    this.message = 'Ошибка при обращении к VK API';
    this.vkErrorCode = errorCode;
    this.vkErrorMsg = errorCode;
  }
}

export const testResponse = (resp) => {
  if (resp.error) {
    throw new ErrorVkResponse(resp);
  }
};

export const vkApi = (method, params) => new Promise((resolve) => {
  VK.api(method, params, (response) => {
    testResponse(response);
    resolve(response);
  });
});

const vkApiTimeoutRequest = (method, params, timeoutErrorTime = 10000) => {
  let timerId;
  const requestPromise = new Promise((resolve) => {
    VK.api(method, params, (response) => {
      clearTimeout(timerId);
      testResponse(response);
      resolve(response);
    });
  });

  const timeoutPromise = new Promise(() => {
    timerId = setTimeout((resolve) => {
      console.warn('timeout');
      resolve('timeout');
    }, timeoutErrorTime);
  });

  return Promise.race([requestPromise, timeoutPromise]);
};

export const vkApiTimeout = (method, params, timeoutErrorTime = 10000,
  attemptCount = 5) => new Promise(async (resolve, reject) => {
  for (let i = 0; i < attemptCount; i += 1) {
    // eslint-disable-next-line
    const result = await vkApiTimeoutRequest(method, params, timeoutErrorTime);
    if (result !== 'timeout') {
      resolve(result);
      return;
    }

    if (i === attemptCount) {
      reject(result);
    }
  }
});

export const showOrderBox = () => {
  const params = {
    type: 'votes',
    votes: 7,
  };

  return new Promise((resolve, reject) => {
    let onSuccess;
    let onFail;
    let onCancel;

    const clearCallbacks = () => {
      VK.removeCallback('onOrderSuccess', onSuccess);
      VK.removeCallback('onOrderFail', onFail);
      VK.removeCallback('onOrderCancel', onCancel);
    };

    onSuccess = (res) => {
      resolve(res);
      clearCallbacks();
    };

    onFail = () => {
      reject('Order fail.');
      clearCallbacks();
    };

    onCancel = () => {
      reject('Order cancel.');
      clearCallbacks();
    };

    VK.addCallback('onOrderSuccess', onSuccess);
    VK.addCallback('onOrderFail', onFail);
    VK.addCallback('onOrderCancel', onCancel);
    VK.callMethod('showOrderBox', params);
  });
};
