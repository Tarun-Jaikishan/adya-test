export default function ErrMessage({ value, customStyle = "" }) {
  return <p className={`${customStyle} text-white text-end`}>{value}</p>;
}
