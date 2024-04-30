export default function Select({
  onChange,
  name,
  value,
  children,
  customStyle = "",
  ...props
}) {
  return (
    <select
      className={`${customStyle} py-1.5 px-3 text-sm rounded border border-[#a7a7a7] text-stone-700 placeholder-[#7e7e7e] focus:outline-none focus:border-stone-500 w-full`}
      name={name}
      onChange={onChange}
      value={value}
      {...props}
    >
      {children}
    </select>
  );
}
