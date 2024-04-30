export default function Button({
  type = "button",
  name,
  onClick = () => {},
  customStyle = "",
  disabled = false,
}) {
  return (
    <button
      className={`${customStyle} ${
        disabled
          ? "bg-gray-500 !text-gray-400"
          : " hover:bg-white hover:text-black"
      } border-2 border-white text-white px-10 py-1.5 rounded font-semibold duration-300`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
