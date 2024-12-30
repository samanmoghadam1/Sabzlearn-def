import "./overlayComponent.css";

const OverlayComponent = ({
  classname,
  open,
  setOpen,
}: {
  classname?: string;
  open: boolean;
  setOpen: (x: boolean) => void;
}) => {
  return (
    <div
      onClick={() => (open ? setOpen(false) : null)}
      className={`overlay  ${classname}`}
    ></div>
  );
};

export default OverlayComponent;
