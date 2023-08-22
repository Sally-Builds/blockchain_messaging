import React from "react";

const Home = () => {
  return (
    <div className="p-4 flex flex-col">
      <div className="py-4">
        <div className="text-3xl font-medium leading-tight pb-8">
          Project Description
        </div>
        <div className="text-gray-500">
          <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
            Dorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Obcaecati praesentium optio cum
            deleniti accusamus consequatur magni velit, eaque voluptatem,
            veritatis perspiciatis atque iusto harum nostrum exercitationem
            tempora id in quisquam?
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam?
          </p>
        </div>
      </div>
      <div className="py-4">
        <div className="text-3xl font-medium leading-tight pb-8">
          Project Manual
        </div>
        <div className="text-gray-500">
          <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
            Morem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam? Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Obcaecati praesentium optio cum
            deleniti accusamus consequatur magni velit, eaque voluptatem,
            veritatis perspiciatis atque iusto harum nostrum exercitationem
            tempora id in quisquam?
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam?
          </p>
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati
            praesentium optio cum deleniti accusamus consequatur magni velit,
            eaque voluptatem, veritatis perspiciatis atque iusto harum nostrum
            exercitationem tempora id in quisquam?
          </p>
        </div>
      </div>
      <div>
        <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">
          Register
        </div>
        <span className="text-blue-400">Connect to register</span>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="terms"
                      class="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
