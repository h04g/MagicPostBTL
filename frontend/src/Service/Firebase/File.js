import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from './Index';
const storage = getStorage(app);
export const uploadFile = (fileData) => {
  return new Promise((resolve, reject) => {
    if (fileData !== undefined) {
      const storageRef = ref(storage, `products/${fileData?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileData);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log(progress);
        },
        (err) => {
          console.error(err);
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((DownloadURL) => {
            resolve(DownloadURL);
          });
        },
      );
    } else {
      resolve('');
    }
  });
};

const validateFileForUpload = (listFile) => {
  return listFile.filter((item) => item.file !== undefined);
};

const validateFileUploaded = (listFile) => {
  return listFile.filter((item) => item.file === undefined);
};

export const uploadMultipleFile = (listFile) => {
  const fileForUpload = validateFileForUpload(listFile);
  const fileUploaded = validateFileUploaded(listFile).map(
    (item) => item.data_url,
  );
  return new Promise((resolve, reject) => {
    const listPromise = fileForUpload.map((file) => uploadFile(file.file));
    Promise.all(listPromise)
      .then((res) => {
        resolve([...fileUploaded, ...res]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
