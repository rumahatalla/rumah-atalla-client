import { Link } from "react-router-dom";

export default function Medsos() {
  const medsos = [
    {
      title: "Instagram",
      image: "/Instagram.png",
      className: "scale-[1.8]",

      link: "https://www.instagram.com/raffi_fashion/",
      text: "Follow @raffi_fashion on Instagram",
    },
    {
      title: "Tiktok",
      image: "/Tiktok.png",
      className: "scale-[2.2]",
      link: "https://www.tiktok.com/@raffi_fashion",
      text: "Follow @raffi_fashion on Tiktok",
    },
    {
      title: "Tokopedia",
      image: "/Tokopedia.png",
      className: "scale-[2]",

      link: "https://www.tokopedia.com/raffi_fashion",
      text: "Follow @raffi_fashion on Tokopedia",
    },
    {
      title: "Shopee",
      image: "/Shopee.png",
      className: "scale-[2]",

      link: "https://shp.ee/2h23qs4",
      text: "Follow @rumahatalla58 on Shopee",
    },
  ];
  return (
    <>
      <div className="w-screen mt-12 sm:mt-20 relative">
        <section className="text-primaryDark body-font z-[10] items-center w-screen justify-center xl:px-32 mt-20">
          <div className="flex flex-wrap ">
            {medsos.map((item, index) => (
              <div key={item.title} className="p-5 h-min-72 w-screen sm:w-1/2">
                <div
                  className={`w-full shadow-lg  hover:shadow-xl ${
                    index === 0
                      ? "shadow-purple-100 hover:shadow-purple-100"
                      : index === 1
                      ? "shadow-indigo-100 hover:shadow-indigo-100"
                      : index === 2
                      ? "shadow-teal-100 hover:shadow-teal-100"
                      : index === 3 && "shadow-pink-100 hover:shadow-pink-100"
                  }  group hover:scale-[1.02] transition-all duration-300 bg-rainbow pb-5 rounded-2xl  h-full relative`}
                >
                  <Link
                    to={item.link}
                    target="_blank"
                    className="p-5 lg:p-10 z-[10] flex items-center max-sm:justify-center"
                  >
                    <div className="w-10 h-10 px-3 hidden sm:inline-flex items-center justify-center rounded-full  text-thirdyThin mb-4 transition-all duration-300">
                      <img
                        src={item.image}
                        className={`w-full ${item.className} `}
                        alt=""
                      />
                    </div>
                    <div className="sm:ml-3 ">
                      <div className="w-full items-center flex justify-center ">
                        <div className="w-10 h-10 px-3 sm:hidden inline-flex items-center justify-center rounded-full text-thirdyThin transition-all duration-300">
                          <img
                            src={item.image}
                            className={`w-full ${item.className} `}
                            alt=""
                          />
                        </div>
                      </div>
                      <h2 className=" text-2xl items-center flex max-sm:justify-center sm:text-left text-center text-primaryDark font-medium title-font mb-1 group-hover:text-secondary drop-shadow-sm transition-all duration-300">
                        {item.title}
                      </h2>
                      <p className="leading-relaxed text-sm sm:text-base text-primaryDark transition-all duration-500 sm:text-justify text-center ">
                        {item.text}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
