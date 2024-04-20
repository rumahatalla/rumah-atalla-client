/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Title2 from "../components/Title2";

export default function NotFound4040() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-screen bg-section flex flex-col items-center justify-center ">
        <img src="/404.svg" className="h-[35%] mb-4" alt="" />
        {/* MAKE NICE TEXT FOR PAGE 404 */}
        <Title2 title={"Page not found - 404"}>
          <i className="mr-2 fa-solid fa-magnifying-glass"></i>
        </Title2>
        <p className="w-[30rem] text-center">
          We are sorry but The Page you are looking for doesn't exist or an
          other error occured while processing your request.
        </p>
        <Button
          className={"mt-7"}
          variant={"secondary"}
          onClick={() => navigate("/")}
        >
          <i className="fa-solid fa-house mr-2"></i>
          Back to Home
        </Button>
      </div>
    </>
  );
}
