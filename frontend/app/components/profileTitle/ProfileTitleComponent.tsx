import Link from "next/link";

const ProfileTitleComponent = ({
  title,
  link,
  className,
}: {
  title: string;
  link?: string;
  className?: string;
}) => {
  return (
    <div
      style={{ borderRight: "10px solid rgb(13 202 240)" }}
      className={`${className} my-3 py-3 p-3 border-start-info d-flex justify-content-between text-info bg-white rounded-2 `}
    >
      <span>{title}</span>
      {
        link ? <Link className="text-info" href={link}>
        <span
          style={{ cursor: "pointer" }}
          className="d-flex align-items-center gap-2"
        >
          مشاهده همه <i className="fa-solid fa-chevron-left"></i>{" "}
        </span>
      </Link> : null
      }
    </div>
  );
};

export default ProfileTitleComponent;
