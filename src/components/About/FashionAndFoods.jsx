export default function FashionAndFoods() {
  return (
    <>
      <div className="w-screen  flex flex-col">
        {/* FASHION */}
        <div className="w-sceem sm:h-[90vh] px-4 sm:px-10 xl:px-52 flex flex-col sm:flex-row gap-0 sm:gap-10 mt-20 sm:mt-32">
          {/* TITTLE MOBILE */}
          <div className="sm:hidden flex items-center gap-5 w-full mb-10">
            <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            <h1 className=" text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
              Fashion
            </h1>
            <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
          </div>

          {/* IMAGE */}
          <div className="h-auto relative sm:w-[50%] lg:w-[40%] aspect-square sm:aspect-[9/16] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl group hover:scale-95 transition-all duration-500 flex items-end ">
            <img
              src="LandingFashion.jpg"
              className="absolute sm:w-auto aspect-square h-full object-cover  transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
              alt="LandingFashion"
            />
            <div className="w-full h-full bg-section-dark opacity-[0.2] absolute"></div>

            {/* TYPOGRAPHY MOBILE */}
            <div className="w-full flex flex-col text-justify group-hover:translate-y-0 translate-y-[28rem] transition-all duration-700 sm:hidden h-auto justify-center relative p-5 bg-[rgba(0,0,0,70%)] rounded-t-sm border-t-4 border-primaryNormal">
              <div className="text-sm text-thirdyThin w-full">
                <h1 className="indent-20">
                  koleksi fashion hijab di Rumah Atalla adalah manifestasi dari
                  keanggunan dan keindahan. Setiap kain dipilih dengan teliti
                  untuk menciptakan hijab-hijab yang tidak hanya mengikuti tren
                  terkini, tetapi juga menampilkan sentuhan klasik yang
                  timeless.
                </h1>
                <ul className="mt-3 ">
                  <li>- Tren Terkini yang Dipadu dengan Sentuhan Klasik</li>
                  <li className="mt-2">- Jahitan Berkualitas Tinggi</li>
                  <li className="mt-2">- Variasi Warna dan Desain</li>
                  <li className="mt-2">- Kenyamanan dan Fungsionalitas</li>
                </ul>
                {/* <Button className={"mt-2"} variant="secondary">
                    Lihat
                  </Button> */}
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY */}
          <div className="w-[50%] lg:w-[60%] sm:flex flex-col text-justify h-full justify-center hidden">
            <div className="flex items-center gap-5 w-[70%] mb-4 ">
              <h1 className="text-4xl sm:text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                Fashions
              </h1>
              <div className="w-full h-[0.15rem] sm:h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>
            <div className="text-lg lg:text-xl  text-primaryDark w-full">
              <h1 className="indent-20">
                koleksi fashion hijab di Rumah Atalla adalah manifestasi dari
                keanggunan dan keindahan. Setiap kain dipilih dengan teliti
                untuk menciptakan hijab-hijab yang tidak hanya mengikuti tren
                terkini, tetapi juga menampilkan sentuhan klasik yang timeless.
                Dari desain yang elegan hingga warna yang memikat, setiap
                jahitan hijab mencerminkan dedikasi kami dalam menciptakan gaya
                yang memancarkan pesona.
              </h1>
              <ul className="mt-3 ">
                <li>- Tren Terkini yang Dipadu dengan Sentuhan Klasik</li>
                <li className="mt-2">- Jahitan Berkualitas Tinggi</li>
                <li className="mt-2">- Variasi Warna dan Desain</li>
                <li className="mt-2">- Kenyamanan dan Fungsionalitas</li>
              </ul>
              {/* <Button className={"mt-7"} variant="secondary">
                  Lihat
                </Button> */}
            </div>
          </div>
        </div>

        {/* FOOD */}
        <div className="w-screen sm:h-[90vh] px-4 sm:px-10 xl:px-52 flex flex-col sm:flex-row gap-0 sm:gap-10 mt-20 sm:mt-32">
          {/* TYPOGRAPHY */}
          <div className="w-[50%] lg:w-[60%] sm:flex flex-col text-justify h-full justify-center hidden">
            <div className="flex items-center gap-5 w-[70%] mb-4 ">
              <h1 className="text-4xl sm:text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
                Foods
              </h1>
              <div className="w-full h-[0.15rem] sm:h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            </div>
            <div className="text-lg lg:text-xl  text-primaryDark w-full">
              <h1 className="indent-20">
                Selain itu, Rumah Atalla juga mengundang Anda untuk menikmati
                petualangan kuliner yang menggoda. Dari hidangan khas yang
                autentik hingga minuman yang menyegarkan, pengalaman gastronomi
                kami dirancang untuk memuaskan setiap selera. Dapur kami
                merupakan tempat di mana inovasi dan tradisi bertemu,
                menghasilkan hidangan-hidangan yang tidak hanya mengundang
                selera, tetapi juga mengundang Anda untuk menjelajahi rasa-rasa
                baru yang memikat.
              </h1>
              <ul className="mt-3 ">
                <li>- Keaslian Rasa yang Mendalam</li>
                <li className="mt-2">
                  - Inovasi Kuliner yang Menggugah Selera
                </li>
                <li className="mt-2">
                  - Teladan Kualitas Bahan Baku yang Teliti
                </li>
                <li className="mt-2">- Diversity Menu yang Mengagumkan</li>
              </ul>
              {/* <Button className={"mt-7"}>Lihat</Button> */}
            </div>
          </div>

          {/* TITTLE MOBILE */}
          <div className="sm:hidden flex items-center gap-5 w-full mb-10">
            <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
            <h1 className=" text-[2.5rem] font-semibold text-primaryNormal drop-shadow-md">
              Foods
            </h1>
            <div className="w-full h-1 bg-secondary rounded-[0.05rem] mt-3 shadow-md"></div>
          </div>

          {/* IMAGE */}
          <div className="h-auto w-full relative sm:w-[50%] lg:w-[40%] aspect-square sm:aspect-[9/16] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl  group hover:scale-95 transition-all duration-500 flex items-end ">
            <img
              src="LandingFood.jpg"
              className="absolute sm:w-auto aspect-square h-full object-cover  transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
              alt="LandingFashion"
            />
            <div className="w-full h-full bg-section-dark opacity-[0.2] absolute"></div>

            {/* TYPOGRAPHY MOBILE */}
            <div className="w-full flex flex-col text-justify group-hover:translate-y-0 translate-y-[28rem] transition-all duration-700 sm:hidden h-auto justify-center relative p-5 bg-[rgba(0,0,0,70%)] rounded-t-sm border-t-4 border-primaryNormal">
              <div className="text-sm text-thirdyThin w-full">
                <h1 className="indent-20">
                  Selain itu, Rumah Atalla juga mengundang Anda untuk menikmati
                  petualangan kuliner yang menggoda. Dari hidangan khas yang
                  autentik hingga minuman yang menyegarkan, pengalaman
                  gastronomi kami dirancang untuk memuaskan setiap selera.
                </h1>
                <ul className="mt-3 ">
                  <li>- Keaslian Rasa yang Mendalam</li>
                  <li className="mt-2">
                    - Inovasi Kuliner yang Menggugah Selera
                  </li>
                  <li className="mt-2">
                    - Teladan Kualitas Bahan Baku yang Teliti
                  </li>
                  <li className="mt-2">- Diversity Menu yang Mengagumkan</li>
                </ul>
                {/* <Button className={"mt-2"}>Lihat</Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
