import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box, Paper, Typography, TextField, MenuItem, Switch, FormControlLabel,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Chip, Alert,Grid
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { createField, deleteField, getFields } from "../../api/fieldApi";
import type { Field, FieldType } from "../../types";

const FIELD_TYPES: FieldType[] = ['text', 'number', 'email', 'date'];

export default function AdminTab() {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset, formState: { errors } } =
  useForm<Partial<Field>>({
    defaultValues: {
      label: '',
      name: '',
      type: 'text',
      required: false,
    },
  });


  const { data: fields, isLoading, isError } = useQuery({ 
    queryKey: ['fields'], 
    queryFn: getFields 
  });

  const createMutation = useMutation({
    mutationFn: createField,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      reset({ label: '', name: '', type: 'text', required: false });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteField,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['fields'] })
  });

  const onSubmit = (data: Partial<Field>) => {
    createMutation.mutate(data);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      
      {/* Create Field Card */}
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ bgcolor: 'primary.main', p: 1, borderRadius: 2, color: 'white' }}>
            <AddIcon />
          </Box>
          <Box>
            <Typography variant="h6">Create New Field</Typography>
            <Typography variant="body2" color="text.secondary">
              Define the fields that will appear in the user form
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid>
              <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>Label</Typography>
              <Controller
                name="label"
                control={control}
                rules={{ required: "Label is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="e.g. Full Name" error={!!errors.label} helperText={errors.label?.message} />
                )}
              />
            </Grid>
            <Grid>
              <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>Field Key (CamelCase)</Typography>
              <Controller
                name="name"
                control={control}
                rules={{ 
                  required: "Key is required",
                  pattern: { value: /^[a-zA-Z0-9_]+$/, message: "No spaces or special chars" }
                }}
                render={({ field }) => (
                  <TextField {...field} fullWidth placeholder="e.g. fullName" error={!!errors.name} helperText={errors.fieldKey?.message} />
                )}
              />
            </Grid>
            <Grid>
              <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>Type</Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select fullWidth>
                    {FIELD_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid >
              <Controller
                name="required"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch checked={field.value} onChange={field.onChange} />}
                    label="Required field"
                  />
                )}
              />
            </Grid>
            <Grid >
              <Button variant="contained" type="submit" startIcon={<AddIcon />} disabled={createMutation.isPending}>
                Add Field
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 2, color: 'white' }}>
            </Box>
            <Box>
                <Typography variant="h6">Configured Fields</Typography>
                <Typography variant="body2" color="text.secondary">
                {fields?.length || 0} fields configured
                </Typography>
            </Box>
        </Box>

        {isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
                Failed to load fields. Make sure your backend is running.
            </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Validation</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} align="center">Loading...</TableCell></TableRow>
              ) : fields?.map((field: Field) => (
                <TableRow key={field._id}>
                  <TableCell>{field.label}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{field.name}</TableCell>
                  <TableCell><Chip label={field.type} size="small" color="primary" variant="outlined" /></TableCell>
                  <TableCell>{field.required ? "Required" : "Optional"}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => deleteMutation.mutate(field._id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {fields?.length === 0 && (
                 <TableRow><TableCell colSpan={5} align="center">No fields configured.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}