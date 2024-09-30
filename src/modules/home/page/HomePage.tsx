import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteConfirmationDialog } from "../components/DeleteConfirmationDialog";
import { FormModal } from "../components/FormModal";
import { useEntity } from "../hooks/useEntity";
import { EntityFormData } from "../components/EntitiesForm";

export const HomePage = () => {
  const {
    entities,
    loading,
    error,
    removeEntity,
    fetchAllEntities,
    createNewEntity,
  } = useEntity();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const entitiesPerPage = 10;
  const totalItems = entities ? entities.length : 0;
  const totalPages = Math.ceil(totalItems / entitiesPerPage);
  const displayedEntities =
    entities?.slice(
      currentPage * entitiesPerPage,
      (currentPage + 1) * entitiesPerPage
    ) || [];

  useEffect(() => {
    fetchAllEntities();
  }, [fetchAllEntities]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if ((currentPage + 1) * entitiesPerPage < totalItems) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedItemId !== null) {
      await removeEntity(selectedItemId);
      setDeleteDialogOpen(false);
      setSelectedItemId(null);
      fetchAllEntities();
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleEditClick = (id: number) => {
    console.log("Editing entity with id:", id);
  };

  const handleSubmit = async (formData: EntityFormData) => {
    await createNewEntity(formData);
    await fetchAllEntities();
    handleClose();
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Entities List
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            New Entity
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Typography variant="h6">Loading entities...</Typography>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Employees</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedEntities.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.phone || "N/A"}</TableCell>
                      <TableCell>{item.employees?.length || 0}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handlePrevious}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <Typography variant="body1">
                Page {currentPage + 1} of {totalPages}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={(currentPage + 1) * entitiesPerPage >= totalItems}
              >
                Next
              </Button>
            </Box>
          </>
        )}

        <FormModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          itemId={selectedItemId}
        />
      </Box>
    </Box>
  );
};
