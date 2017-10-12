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

export const vkApiTimeout = async (method, params, time, timeoutError = 5000, callback) => {
  for(let i = 0; i < 5; i++) {
    let result = await vkApiTimeoutRequest(method, params, time, timeoutError);
    if(result !== 'timeout') {
      if (callback) callback();
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

export const showOrderBox = () => {
  let params = {
    type: 'votes',
    votes: 7
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