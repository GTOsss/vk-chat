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