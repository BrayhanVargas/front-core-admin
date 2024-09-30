import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FC } from "react";
import { Add, Delete } from "@mui/icons-material";

export interface EntityFormData {
  name: string;
  description: string;
  address: string;
  email: string;
  phone?: string;
  employees?: EmployeeFormData[];
}

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  position?: string;
  email: string;
  phone?: string; 
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description cannot exceed 500 characters"),
  address: Yup.string()
    .required("Address is required")
    .max(200, "Address cannot exceed 200 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .optional(), 
  employees: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        position: Yup.string().optional(),
        email: Yup.string()
          .email("Please enter a valid email")
          .required("Email is required"),
        phone: Yup.string()
          .matches(/^\d{10}$/, "Phone number must be 10 digits")
          .optional(),
      })
    )
    .optional(),
});

interface EntitiesFormProps {
  handleSubmit: (data: EntityFormData) => void;
}

export const EntitiesForm: FC<EntitiesFormProps> = ({ handleSubmit }) => {
  const {
    control,
    handleSubmit: onSubmit,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "employees",
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(handleSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5">Create New Entity</Typography>
      <Divider />

      <Typography variant="h6">Entity Information</Typography>
      <FormControl fullWidth>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              type="text"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              type="text"
              error={!!errors.address}
              helperText={errors.address ? errors.address.message : ""}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              type="text"
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ""}
            />
          )}
        />
      </FormControl>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Employees</Typography>

      {fields.map((field, index) => (
        <Box key={field.id} sx={{ display: "flex", gap: "10px", mb: 2 }}>
          <FormControl fullWidth>
            <Controller
              name={`employees.${index}.firstName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  type="text"
                  error={!!errors.employees?.[index]?.firstName}
                  helperText={errors.employees?.[index]?.firstName?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name={`employees.${index}.lastName`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  type="text"
                  error={!!errors.employees?.[index]?.lastName}
                  helperText={errors.employees?.[index]?.lastName?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name={`employees.${index}.email`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.employees?.[index]?.email}
                  helperText={errors.employees?.[index]?.email?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name={`employees.${index}.phone`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  type="text"
                  error={!!errors.employees?.[index]?.phone}
                  helperText={errors.employees?.[index]?.phone?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <Controller
              name={`employees.${index}.position`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Position" type="text" />
              )}
            />
          </FormControl>

          <IconButton onClick={() => remove(index)}>
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            firstName: "",
            lastName: "",
            email: "",
            position: "",
          })
        }
        variant="outlined"
        startIcon={<Add />}
      >
        Add Employee
      </Button>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={false}
      >
        Save
      </Button>
    </Box>
  );
};
