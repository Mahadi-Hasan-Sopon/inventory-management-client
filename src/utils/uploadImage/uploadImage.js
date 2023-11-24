import axios from "axios";

const uploadImage = (image) => {
  return axios
    .post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
      { image },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => err);
};

export default uploadImage;
