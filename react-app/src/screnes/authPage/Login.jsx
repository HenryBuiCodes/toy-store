import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import { setToken, setUserId, setUserName } from "../../helper/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      axios
        .post("http://localhost:1337/api/auth/local", {
          identifier: email,
          password: password,
        })
        .then((response) => {
          // Handle success.
          setToken(response.data.jwt);
          setUserId(response.data.user.id);
          setUserName(response.data.user.username);
          navigate("/");
        })
        .catch((error) => {
          // Handle error.
          setError("Wrong email or password");
        });
    } else {
      setError("Pls fill both email and password");
    }
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {error !== "" && (
              <ErrorAlert
                wrapClassName="flex justify-center items-center"
                errorMessage={error}
              />
            )}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            {/* <form className="space-y-4 md:space-y-6" action="#"> */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email or Your username
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label forName="remember" className="text-gray-500 ">
                    Remember me
                  </label>
                </div>
              </div>
            </div> */}
            <button
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              onClick={handleLogin}
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Don’t have an account yet?{" "}
              <span
                onClick={() => navigate("/register")}
                className="font-medium text-primary-600 hover:underline "
              >
                Sign up
              </span>
            </p>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
