export default function Success() {
  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 text-center">
            <div className="flex justify-center items-center mb-6">
              <svg
                fill="#16a34a"
                width="40px"
                height="40px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z"></path>
              </svg>
              <h2 className="font-semibold text-xl ml-2 text-[#16a34a] leading-tight">
                Your submission was successful!
              </h2>
            </div>
            <div className="w-1/2 m-auto border-2 border-black my-8 bg-white h-5 dark:bg-gray-700">
              <div className="bg-gray-400 h-4" style={{ width: "45%" }}></div>
            </div>
            <p className="text-sm font-bold text-gray-800 pb-1">
              We`&apos;`re generating your content. You will receive an email in
              approximately 0 minutes.
            </p>
            <div className="text-gray-400 p-10 my-10">
              <p className="flex items-center justify-center max-w-[619px] m-auto">
                <svg
                  className="mr-3 w-[45px]"
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
                  ></path>
                </svg>
                Remember to download and keep a backup of your documents as soon
                as you receive the email.The documents will not be available for
                download after 30 days.
              </p>
            </div>
            <p className="p-10">
              If you have any questions or issues, please contact us at{" "}
              <a
                href="mailto:cfe@goodmanlantern.com"
                className="text-[#007bff] underline"
              >
                email address
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
