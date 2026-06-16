import { Button } from "./Button";
import { useModal } from "../../context/ModalContext";

export const ModalBox = ({
  operationType,
  onConfirm,
  onCancel,
  variantButton = "cristal",
  classNameButton = "",
  prevActionButton = () => {},
  children,
}) => {
  console.log("ModalBox renderizado");
  const { openModal, closeModal } = useModal();

  const handleOpen = () => {
    prevActionButton();
    openModal(
      <div className="text-center">
        <h3 className="text-lg font-bold mb-4">Confirm {operationType}?</h3>
        <div className="flex gap-4 justify-center">
          <Button
            variant="primary"
            onClick={onCancel || closeModal}
            className="px-4 py-2 rounded-xl w-25"
          >
            Cancel
          </Button>
          <Button
            variant="tertiary"
            onClick={async () => {
              // Si onConfirm es async, esto espera a que termine antes de cerrar
              await onConfirm();
              closeModal();
            }}
            className="px-4 py-2 rounded-xl w-25"
          >
            Confirm
          </Button>
        </div>
      </div>,
    );
  };

  // Renderizamos un botón que dispara el modal,
  // permitiendo que el usuario personalice el texto o el estilo
  return (
    <Button
      onClick={handleOpen}
      variant={variantButton}
      className={classNameButton}
    >
      {children || operationType}
    </Button>
  );
};
