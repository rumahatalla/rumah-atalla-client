/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FashionAndFoods from "../components/About/FashionAndFoods";
import Gallery from "../components/About/Gallery";
import Header from "../components/About/Header";
import Medsos from "../components/About/Medsos";
import Quote from "../components/About/Quote";
import Button from "../components/Button";
import axios from "axios";
import Title from "../components/Title";
import FashionKasirSection from "../components/Kasir/FashionKasirSection";
import { Link } from "react-router-dom";

export default function About() {
  const DBURL = import.meta.env.VITE_APP_DB_URL;
  const [fashionProducts, setFashionProducts] = useState([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);

  const fetchFashionProducts = async () => {
    setIsLoadingFetch(true);
    await axios
      .get(DBURL + "/products/")
      .then((res) => {
        setFashionProducts(res.data);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const User = localStorage?.getItem("user")
    ? JSON.parse(localStorage?.getItem("user"))
    : null;
  useEffect(() => {
    fetchFashionProducts();
  }, []);

  return (
    <>
      <div>
        {/* HEADER */}
        <Header User={User} />

        {/* FASHION AND FOOD */}
        <FashionAndFoods />

        {/* MEDSOS */}
        <Medsos />

        {/* KUTIPAN */}
        <Quote />

        {/* FOTO FOTO */}
        <Gallery />

        {/* PRODUCT REKOMENDASI */}
        <div className="w-screen h-auto flex xl:px-52 flex-col items-center bg-thirdyThin pt-20 mb-20 ">
          {/* TITTLE */}
          <Title title="Recent Fashion" />

          {/* PRODUCT */}
          <div className="grid grid-cols-3 gap-x-2  w-full gap-y-10 ">
            {fashionProducts.map((product, index) => {
              if (index < fashionProducts?.length - 6) return;
              return (
                <Link key={index} to={"/fashions/?opened=" + product.name}>
                  <FashionKasirSection
                    props={product}
                    key={index}
                    FashionCartItems={[]}
                    toggleShowMore={{}}
                  />
                </Link>
              );
            })}
          </div>
          <Link to="/fashions">
            <Button className={"mt-7"} variant="secondary">
              <i className="fa-solid fa-shirt mr-2"></i>
              More
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
