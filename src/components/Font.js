import clsx from "clsx";

const H1 = ({ children, className = "" }) => <h1 className={clsx(`text-5xl font-extrabold`, className)}>{children}</h1>;
const H2 = ({ children, className = "" }) => <h2 className={clsx(`text-4xl font-bold`, className)}>{children}</h2>;
const H3 = ({ children, className = "" }) => <h3 className={clsx(`text-3xl font-bold`, className)}>{children}</h3>;
const H4 = ({ children, className = "" }) => <h4 className={clsx(`text-2xl font-bold`, className)}>{children}</h4>;
const H5 = ({ children, className = "" }) => <h5 className={clsx(`text-xl font-bold`, className)}>{children}</h5>;
const H6 = ({ children, className = "" }) => <h6 className={clsx(`text-lg font-bold`, className)}>{children}</h6>;

const HR = () => <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />;

const P = ({ children, className = "" }) => <p className={(clsx(`text-grey-500`), className)}>{children}</p>;

export { H1, H2, H3, H4, H5, H6, HR, P };
