export default function TextField({
  type = "text",
  value,
  onChange,
  name,
  customStyle = "",
  placeholder = "",
  ...props
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      title={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${customStyle} py-1.5 px-3 text-sm rounded border border-[#a7a7a7] text-stone-700 placeholder-[#7e7e7e] focus:outline-none focus:border-stone-500 w-[14rem]"
      }`}
      {...props}
    />
  );
}
