import { uploadFileRequest } from './upload_file_request';

export const uploadFile = data => async dispatch => {
  try {
    dispatch({
      type: "UPLOAD_FILE_REQUEST",
    });

    await uploadFileRequest(data);

    dispatch({
      type: "UPLOAD_FILE_SUCCESS",
    });

    alert('File uploaded successfully!');
  } catch (error) {
    dispatch({
      type: "UPLOAD_FILE_ERROR",
    });
    
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong while uploading this file');
    }
  }
};