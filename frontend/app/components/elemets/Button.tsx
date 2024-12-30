import Link from "next/link";
import "./button.css";

const Button = ({
  disable,
  style,
  title,
  className,
  link,
  onclick,
  open,
  setOpen,
}: {
  title: string;
  className?: string;
  style?: {};
  link?: string;
  onclick?: string;
  data?: {};
  open?: boolean;
  setOpen?: (n: boolean) => void;
  disable: boolean;
}) => {
  return !link ? (
    <button
      style={style}
      className={`d-block w-100 border-0 p-2 rounded-2 text-white ${className}  sabzleaen-btn`}
    >
      {title}
    </button>
  ) : (
    <Link href={link}>
      <button
        onClick={() => (setOpen ? setOpen(false) : null)}
        style={{...style, cursor: "pointer"}}
        className={`d-block w-100 border-0 p-2 rounded-2 text-white ${className}  sabzleaen-btn`}
      >
        {title}
      </button>
    </Link>
  );
};

export default Button;
