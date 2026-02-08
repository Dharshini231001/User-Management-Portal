import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, InputAdornment, TablePagination, CircularProgress, Stack,  Avatar
} from "@mui/material";
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Add as AddIcon, 
  Search as SearchIcon, 
  Group as UserIcon,
  ContactPage as ProfileIcon
} from "@mui/icons-material";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/userApi";
import { getFields } from "../../api/fieldApi";
import type { Field, User } from "../../types";
import ConfirmDeleteDialog from "../../components/dialog/deleteConfirmation";

export default function UserTab() {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const queryClient = useQueryClient();
  const { data: fields } = useQuery<Field[]>({ queryKey: ['fields'], queryFn: getFields });
  const { data: users } = useQuery<User[]>({ queryKey: ['users'], queryFn: getUsers });

  const { control, handleSubmit, reset } = useForm();

  const handleOpen = (user?: User) => {
    if (user) { 
      setEditingUser(user); 
      reset(user.data); 
    } else { 
      setEditingUser(null); 
      reset({}); 
    }
    setOpen(true);
  };

  const handleClose = () => { setOpen(false); reset({}); };

  const createMut = useMutation({ 
    mutationFn: createUser, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
      handleClose(); 
    } 
  });

  const updateMut = useMutation({ 
    mutationFn: updateUser, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
      handleClose(); 
    } 
  });

  const deleteMut = useMutation({ 
    mutationFn: deleteUser, 
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
      setDeleteId(null); 
    } 
  });

  const onSubmit = (formData: any) => {
    if (editingUser) {
      updateMut.mutate({ id: editingUser._id, data: formData });
    } else {
      createMut.mutate(formData);
    }
  };

  const filteredUsers = users?.filter(u => 
    Object.values(u.data).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  ) || [];

  if (!fields) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

  return (
    <Stack spacing={4}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Paper sx={{ 
          p: 3, borderRadius: 5, flex: 1,
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white', display: 'flex', alignItems: 'center', gap: 3,
          boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
        }}>
          <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
            <UserIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="900">{users?.length || 0}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              Total Registered Users
            </Typography>
          </Box>
        </Paper>

        <Paper sx={{ 
          p: 3, borderRadius: 5, width: '300px',
          background: 'white', border: '1px solid #e2e8f0',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<AddIcon />} 
            onClick={() => handleOpen()} 
            sx={{ 
              borderRadius: 3, 
              py: 1.5, 
              background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
              fontWeight: 800, 
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)'
              }
            }}
          >
            Add New User
          </Button>
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
        <Typography variant="h6" fontWeight="900" sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          <ProfileIcon color="primary" /> User Directory
        </Typography>

        <TextField 
          size="small" placeholder="Search by any field..." 
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{ 
            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" sx={{ color: '#64748b' }} /></InputAdornment>,
            sx: { bgcolor: 'white', borderRadius: 3, width: 300, border: '1px solid #e2e8f0', '& fieldset': { border: 'none' } }
          }} 
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 5, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {fields.map(f => (
                <TableCell key={f._id} sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>
                  {f.label.toUpperCase()}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'white' }}>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id} hover>
                {fields.map(f => (
                  <TableCell key={f._id} sx={{ fontWeight: 600, color: '#334155' }}>
                    {user.data?.[f.name] || <Typography variant="caption" sx={{ color: '#cbd5e1' }}>—</Typography>}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end" spacing={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpen(user)}
                      sx={{ 
                        color: '#3b82f6',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          bgcolor: '#eff6ff', 
                          filter: 'drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.6))',
                          transform: 'scale(1.1)' 
                        } 
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => setDeleteId(user._id)}
                      sx={{ 
                        color: '#f43f5e',
                        transition: 'all 0.2s',
                        '&:hover': { 
                          bgcolor: '#fff1f2', 
                          color: '#e11d48',
                          filter: 'drop-shadow(0px 0px 8px rgba(244, 63, 94, 0.6))',
                          transform: 'scale(1.1)'
                        } 
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination component="div" count={filteredUsers.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(_, p) => setPage(p)} />
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="xs" 
        PaperProps={{ sx: { borderRadius: 5, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 900, color: '#1e293b' }}>
          {editingUser ? "Edit User Details" : "New User Profile"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {fields.map((f) => (
              <Controller
                key={f._id} 
                name={f.name} 
                control={control} 
                defaultValue=""
                rules={{ 
                  required: f.required ? `${f.label} is required` : false,
                  pattern: f.type === 'email' ? { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } : undefined 
                }}
                render={({ field, fieldState }) => (
                  <TextField 
                    {...field} 
                    label={f.label} 
                    type={f.type} 
                    fullWidth 
                    size="small"
                    error={!!fieldState.error} 
                    helperText={fieldState.error?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                  />
                )}
              />
            ))}
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={handleClose} sx={{ color: '#64748b', fontWeight: 700 }}>Cancel</Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={createMut.isPending || updateMut.isPending}
              sx={{ 
                px: 4, 
                borderRadius: 3, 
                fontWeight: 800, 
                background: 'linear-gradient(45deg, #1e293b, #334155)',
                textTransform: 'none'
              }}
            >
              {editingUser ? "Update Profile" : "Save User"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ConfirmDeleteDialog
        open={Boolean(deleteId)} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)} 
        isLoading={deleteMut.isPending}
      />
    </Stack>
  );
}