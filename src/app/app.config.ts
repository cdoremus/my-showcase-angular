
const BASE_URL = 'http://localhost:8080';
export const config = {
  loginUrl: BASE_URL + '/user/findByLoginId?loginId=',
  fileUploadUrl: BASE_URL + '/displayItem/upload',
  saveFileMetadata: BASE_URL + '/displayItem/save'
};
