import axios from "axios";

const uploadImage = async (image) => {
  try {
    const res = await axios
      .post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API}`,
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    return res.data;
  } catch (err) {
    return err;
  }
};

export default uploadImage;
