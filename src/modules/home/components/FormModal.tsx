import { Box, Modal } from "@mui/material";
import { FC } from "react";
import { EntitiesForm, EntityFormData } from "./EntitiesForm";

interface FormModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (data: EntityFormData) => void;
}

export const FormModal: FC<FormModalProps> = ({
  open,
  handleSubmit,
  handleClose,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
        }}
      >
        <EntitiesForm handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};
