import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, IconButton, Typography, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/userApi";
import { getFields } from "../../api/fieldApi";
import type { Field, User } from "../../types";


export default function UserTab() {
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const { data: fields } = useQuery<Field[]>({ queryKey: ['fields'], queryFn: getFields });

  const { data: users, isLoading, isError, error } = useQuery<User[]>({ 
    queryKey: ['users'], 
    queryFn: getUsers 
  });

  console.log("Users Data in Component:", users);

  if (isError) {
    console.error("Query Error:", error);
    return <Typography color="error">Error loading users: {error.message}</Typography>;
  }

  const { control, handleSubmit, reset, setValue } = useForm();

  const createMut = useMutation({
    mutationFn: createUser,
    onSuccess: () => handleSuccess(),
  });

  const updateMut = useMutation({
    mutationFn: updateUser,
    onSuccess: () => handleSuccess(),
  });

  const deleteMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    handleClose();
  };

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      // Populate form dynamically based on user.data
      fields?.forEach((field) => {
        setValue(field.fieldKey, user.data[field.fieldKey] || '');
      });
    } else {
      setEditingUser(null);
      reset({}); // Clear form
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset({});
  };

  const onSubmit = (data: any) => {
    if (editingUser) {
      updateMut.mutate({ id: editingUser._id, data });
    } else {
      createMut.mutate(data);
    }
  };
  

  if (!fields) return <CircularProgress />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">User Registry</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ bgcolor: 'background.default' }}>
            <TableRow>
              {/* Dynamic Headers */}
              {fields.map((field) => (
                <TableCell key={field._id}>{field.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? <TableRow><TableCell colSpan={10}>Loading...</TableCell></TableRow> : 
             users?.map((user) => (
              <TableRow key={user._id} hover>
                {/* Dynamic Cells */}
                {fields.map((field) => (
                  <TableCell key={field._id}>
                  {user.data?.[field.name] ?? "—"}
                </TableCell>
                
                ))}
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(user)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => deleteMut.mutate(user._id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {fields.map((field) => (
                <Controller
                  key={field._id}
                  name={field.name}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: field.required ? `${field.label} is required` : false,
                    pattern: field.type === 'email' ? {
                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                       message: "Invalid email address"
                    } : undefined
                  }}
                  render={({ field: controllerField, fieldState }) => (
                    <TextField
                      {...controllerField}
                      label={field.label}
                      type={field.type}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      fullWidth
                    />
                  )}
                />
              ))}
              {fields.length === 0 && <Typography>No fields configured by Admin yet.</Typography>}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={fields.length === 0}>Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}