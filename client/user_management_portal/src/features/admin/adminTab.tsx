import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box, Paper, Typography, TextField, MenuItem, Switch, FormControlLabel,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Chip, Grid, TablePagination, Stack, InputAdornment
} from "@mui/material";
import { DeleteOutline as DeleteIcon, Add as AddIcon, Search as SearchIcon, SettingsSuggest as FieldIcon } from "@mui/icons-material";
import { createField, deleteField, getFields } from "../../api/fieldApi";
import type { Field, FieldType } from "../../types";
import ConfirmDeleteDialog from "../../components/dialog/deleteConfirmation";

const FIELD_TYPES: FieldType[] = ['text', 'number', 'email', 'date'];

export default function AdminTab() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const { control, handleSubmit, reset } = useForm<Partial<Field>>({
    defaultValues: { label: '', name: '', type: 'text', required: false },
  });

  const { data: fields } = useQuery({ queryKey: ['fields'], queryFn: getFields });

  const createMut = useMutation({
    mutationFn: createField,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['fields'] }); reset(); }
  });

  const deleteMut = useMutation({
    mutationFn: deleteField,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['fields'] }); setDeleteId(null); }
  });

  const filteredFields = fields?.filter(f => 
    f.label.toLowerCase().includes(search.toLowerCase()) || f.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3, borderRadius: 5, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <Typography variant="subtitle1" fontWeight="900" sx={{ mb: 2, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          <FieldIcon color="primary" /> Configure Fields
        </Typography>
        <form onSubmit={handleSubmit((data) => createMut.mutate(data))}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid>
              <Controller name="label" control={control} rules={{ required: "Required" }} render={({ field, fieldState }) => (
                <TextField {...field} label="Display Name" fullWidth size="small" error={!!fieldState.error} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
              )}/>
            </Grid>
            <Grid >
              <Controller name="name" control={control} rules={{ required: "Required" }} render={({ field, fieldState }) => (
                <TextField {...field} label="Database Key" fullWidth size="small" error={!!fieldState.error} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
              )}/>
            </Grid>
            <Grid>
              <Controller name="type" control={control} render={({ field }) => (
                <TextField {...field} select label="Type" fullWidth size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                  {FIELD_TYPES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </TextField>
              )}/>
            </Grid>
            <Grid>
              <FormControlLabel sx={{ mt: 0.5, ml: 1 }} control={<Switch checked={control._defaultValues.required} {...control.register("required")} size="small" />} label={<Typography variant="body2" fontWeight="700">Required</Typography>} />
            </Grid>
            <Grid >
              <Button variant="contained" type="submit" fullWidth disabled={createMut.isPending} sx={{ py: 1, borderRadius: 3, fontWeight: 800, textTransform: 'none', background: 'linear-gradient(45deg, #3b82f6, #2563eb)' }} startIcon={<AddIcon />}>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" fontWeight="900" color="#1e293b">Fields</Typography>
          <Chip label={`${fields?.length || 0} Total Fields`} sx={{ background: 'linear-gradient(45deg, #1e293b, #334155)', color: 'white', fontWeight: 800, px: 1 }} />
        </Stack>
        <TextField size="small" placeholder="Filter architecture..." onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment>, sx: { bgcolor: 'white', borderRadius: 3, width: 250, border: '1px solid #e2e8f0', '& fieldset': { border: 'none' } } }} />
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: 5, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>LABEL</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>KEY</TableCell>
              <TableCell sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>TYPE</TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: '#64748b', fontSize: '0.75rem' }}>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: 'white' }}>
            {filteredFields.slice(page * 5, page * 5 + 5).map((f: Field) => (
              <TableRow key={f._id} hover>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b' }}>{f.label}</TableCell>
                <TableCell><Typography variant="caption" sx={{ fontFamily: 'monospace', bgcolor: '#f1f5f9', px: 1, py: 0.5, borderRadius: 1 }}>{f.name}</Typography></TableCell>
                <TableCell><Chip label={f.type} size="small" sx={{ fontWeight: 800, borderRadius: 1.5, bgcolor: '#eff6ff', color: '#3b82f6', fontSize: '0.7rem' }} /></TableCell>
                <TableCell align="right">
                  <IconButton size="small" sx={{ color: '#fda4af', '&:hover': { color: '#f43f5e' } }} onClick={() => setDeleteId(f._id)}><DeleteIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination component="div" count={filteredFields.length} rowsPerPage={5} page={page} onPageChange={(_, p) => setPage(p)} />
      </TableContainer>

      <ConfirmDeleteDialog
        open={Boolean(deleteId)} 
        onClose={() => setDeleteId(null)} 
        onConfirm={() => deleteId && deleteMut.mutate(deleteId)} 
        isLoading={deleteMut.isPending}
        title="Remove Architecture Field"
      />
    </Stack>
  );
}