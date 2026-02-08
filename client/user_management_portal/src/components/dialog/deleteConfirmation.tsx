import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { WarningAmber as WarningIcon } from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export default function ConfirmDeleteDialog({ open, onClose, onConfirm, title, message, isLoading }: Props) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4, p: 1, width: '400px' } }}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 800, color: '#1e293b' }}>
        <WarningIcon sx={{ color: '#ef4444' }} /> {title || "Confirm Deletion"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: 500, color: '#64748b' }}>
          {message || "Are you sure you want to delete this record? This action cannot be undone."}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#64748b', fontWeight: 700, textTransform: 'none' }}>Cancel</Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          disabled={isLoading}
          sx={{ bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' }, fontWeight: 700, textTransform: 'none', borderRadius: 2 }}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}