import { P } from "./Font";

export default function ShowMessage({ open, message, variant, onClose }) {
  const baseStyle = "p-4 m-4 text-sm rounded-md justify-between flex items-center";
  const variantStyles = {
    success: "bg-green-100 text-green-700 border border-green-300",
    error: "bg-red-100 text-red-700 border border-red-300",
    info: "bg-blue-100 text-blue-700 border border-blue-300",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  };

  return (
    <>
      {open ? (
        <div className={`${baseStyle} ${variantStyles[variant]}`}>
          <P>{message}</P>
          <div className="cursor-pointer" onClick={onClose}>
            x
          </div>
        </div>
      ) : null}
    </>
  );
}
