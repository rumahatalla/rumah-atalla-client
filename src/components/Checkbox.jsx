/* eslint-disable react/prop-types */
export default function Checkbox({
  checked,
  onChange,
  id,
  name,
  color,
  bold,
  attached,
}) {
  return (
    <div className={`flex items-center ${attached && "mb-1"} `}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-secondary "
      />
      <label
        htmlFor={id}
        className={`ms-2 text-sm ${bold ? "font-semibold" : "font-medium"} ${
          color === "red"
            ? "text-red-400"
            : color === "green"
            ? "text-green-400"
            : color === "yellow"
            ? "text-yellow-400"
            : "text-primaryDark"
        }`}
      >
        {name}
      </label>
    </div>
  );
}
