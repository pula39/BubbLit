import axios from 'axios';

export const uploadFileRequest = (file) => {
  const data = new FormData();
  console.log(file)
  data.append('file', file, "image");

  return axios.post(`api/room/upload_photo`, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
    timeout: 30000,
  });
};