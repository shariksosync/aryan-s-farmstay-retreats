import Modal from "./Modal.jsx";
import Icon from "./Icons.jsx";

export default function ConfirmDialog({ open, title = "Are you sure?", message, confirmLabel = "Delete", onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn btn-sm btn-quiet" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
          >
            <Icon name="trash" className="h-4 w-4" /> {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
          <Icon name="alert" />
        </span>
        <p className="pt-1 text-sm leading-relaxed text-ink">{message}</p>
      </div>
    </Modal>
  );
}
