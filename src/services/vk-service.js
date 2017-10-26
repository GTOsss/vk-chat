class ErrorVkResponse {
  constructor({ error: { error_code, error_msg } }) {
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

// export const vkApiSetTimeout = async (method, params, time, timeoutError = 5000, callback) => {
//   for (let i = 0; i < 5; i += 1) {
//     // eslint-disable-next-line no-await-in-loop
//     const result = await vkApiTimeoutRequest(method, params, time, timeoutError);
//     if (result !== 'timeout') {
//       if (callback) callback();
//       return new Promise((resolve) => {
//         resolve(result);
//       });
//     }
//   }
//
//   return new Promise((resolve, reject) => {
//     reject(`Timeout error (${timeoutError * 5 / 100}s)`);
//   });
// };

export const vkApiTimeout = (method, params, timeoutErrorTime = 10000,
  attemptCount = 5) => new Promise(async (resolve, reject) => {
  for (let i = 0; i < attemptCount; i += 1) {
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
    const clearCallbacks = () => {
      VK.removeCallback('onOrderSuccess', onSuccess);
      VK.removeCallback('onOrderFail', onFail);
      VK.removeCallback('onOrderCancel', onCancel);
    };

    const onSuccess = (res) => {
      resolve(res);
      clearCallbacks();
    };

    const onFail = () => {
      reject('Order fail.');
      clearCallbacks();
    };

    const onCancel = () => {
      reject('Order cancel.');
      clearCallbacks();
    };

    VK.addCallback('onOrderSuccess', onSuccess);
    VK.addCallback('onOrderFail', onFail);
    VK.addCallback('onOrderCancel', onCancel);
    VK.callMethod('showOrderBox', params);
  });
};
