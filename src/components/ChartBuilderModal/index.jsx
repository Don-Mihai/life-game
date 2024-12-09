import Modal from '@mui/material/Modal';
import ChartBuilder from '../ChartBuilder/index.jsx';

export default function ChartBuilderModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div>
        <ChartBuilder />
      </div>
    </Modal>
  );
}
