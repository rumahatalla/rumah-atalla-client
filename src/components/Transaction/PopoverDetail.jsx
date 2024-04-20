/* eslint-disable react/prop-types */
export default function PopoverDetail({ left, right, className, bold }) {
  return (
    <>
      <div className={`${bold ? "font-semibold" : ""} flex ${className}`}>
        <h1 className="mr-2 ">{left} </h1>
        <h1 className="capitalize">{right}</h1>
      </div>
    </>
  );
}
