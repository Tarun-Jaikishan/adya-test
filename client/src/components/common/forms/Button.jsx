export default function Button({
  type = "button",
  name,
  onClick = () => {},
  customStyle = "",
}) {
  return (
    <button
      className={`${customStyle} border-2 border-white text-white px-10 py-1.5 rounded font-semibold hover:bg-white hover:text-black duration-300`}
      onClick={onClick}
      type={type}
    >
      {name}
    </button>
  );
}
