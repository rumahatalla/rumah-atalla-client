/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
export default function Footer({ adminPage }) {
  return (
    <>
      <footer
        className={`text-white bg-section-dark shadow-xl ${
          adminPage && "mb-6 rounded-2xl"
        }`}
      >
        <div className={`container py-14 sm:py-20 mx-auto `}>
          <div className="grid grid-cols-4 px-10 md:text-left text-center justify-center w-full">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              {/* LOGO */}
              <div className="flex sm:mr-10 max-sm:items-center max-sm:mb-4 max-sm:justify-center">
                <img
                  src="/LogoWhite.png"
                  className="w-[3.7rem] scale-[0.9] -mt-2 h-[3.7rem]"
                  alt="Logo"
                />
                <div className="uppercase ml-1 text-base ">
                  <h1 className="-mb-[0.4rem]">Rumah</h1>
                  <h1 className="font-bold">Atalla</h1>
                  <div className="w-[120%] h-[0.1rem] -my-[0.15rem] rounded-md bg-white" />
                </div>
              </div>
              <p className="mt-2 text-sm ">
                Kepuasan Anda Adalah Prioritas Kami
              </p>
            </div>
            <div className="w-full px-4 max-sm:hidden">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                FOLLOW US
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">Instagram</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Facebook</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Twitter</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Pinterest</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 max-sm:hidden">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                ABOUT US
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">Our Story</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Our Team</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Customer Reviews</a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">Contact Us</a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 max-sm:hidden">
              <h2 className="title-font font-medium  tracking-widest text-sm mb-3">
                CONTACT US
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className=" hover:text-gray-800">
                    Email: info@rumahatalla.com
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    No. Telp: 0812-1234-5678
                  </a>
                </li>
                <li>
                  <a className=" hover:text-gray-800">
                    Jln. Brigjen Katamso No.19 Wonokarto, Wonogiri
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)]">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Rumah Atalla —
              <a
                href="https://twitter.com/"
                className="ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Raffi Atalla Atmaja
              </a>
            </p>
            <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-sm max-sm:hidden">
              Kepuasan Anda Adalah Prioritas Kami
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
