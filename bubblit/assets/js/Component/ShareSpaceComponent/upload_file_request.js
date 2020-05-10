import axios from 'axios';

export const uploadFileRequest = (room_id, file) => {
  const data = new FormData();
  console.log(file)
  data.append('file', file, "image");

  return axios.post(`api/room/upload_image/` + room_id, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
    timeout: 30000,
  });
};