import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import uploadImage from "../../utils/uploadImage/uploadImage";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { createUserWithEmail, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const loadingToast = toast.loading("Registration in process...");
    try {
      // upload image to imgbb
      const isImage = await uploadImage(image);

      const register = await createUserWithEmail(email, password);

      if (!register.user) {
        return toast.error("User registration failed, Try again.", {
          id: loadingToast,
        });
      }

      const profileImage = isImage?.data?.display_url;
      console.log(profileImage);

      // update user name & avatar
      await updateUserProfile(register.user, name, profileImage).then(() => {
        toast.success("User Registration Successful.", { id: loadingToast });
      });

      navigate("/create-shop");
    } catch (error) {
      console.log(error);
      toast.error(error?.message, { id: loadingToast });
    }
  };

  return (
    <div className="bg-gray-50 h-[calc(100vh-75px)]">
      <div className="flex flex-col items-center pt-4 justify-center h-full">
        <h3 className="text-4xl font-bold text-purple-600">Register Now!</h3>

        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleRegistration}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mt-1 p-2"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  name="name"
                  type="text"
                  className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mt-1 p-2"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  name="email"
                  type="email"
                  className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  name="password"
                  type="password"
                  className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="form-control w-full max-w-lg my-2">
              <label className="label">
                <span className="label-text block text-sm font-medium text-gray-700 mb-1">
                  Upload Profile Image
                </span>
              </label>
              <input
                name="image"
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="flex items-center mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <Link
                to="/login"
                className="text-purple-600 hover:underline"
                href="#"
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
