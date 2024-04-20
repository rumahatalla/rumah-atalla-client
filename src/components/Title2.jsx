/* eslint-disable react/prop-types */
export default function Title2({ title, className, children }) {
  return (
    <>
      <h1
        className={
          "text-2xl mb-3 drop-shadow-md h-fit font-semibold text-primaryNormal " +
          className
        }
      >
        {children}
        {title}
      </h1>
    </>
  );
}
