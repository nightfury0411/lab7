import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import * as React from "react";

const tableCell = [
  "id",
  "image",
  "name",
  "color",
  "origin",
  "category",
  "rate",
  "action",
];

function OrchidPage() {
  const [rows, setRows] = React.useState([[]]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const [reload, setReload] = React.useState(true);

  const [openForm, setOpenForm] = React.useState(false);
  const [formType, setFormType] = React.useState("");
  const [formData, setFormData] = React.useState({
    id: "",
    image: "",
    name: "",
    color: "",
    origin: "",
    category: "",
    rate: 0,
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenForm = (type, data = {}) => {
    setFormType(type);
    setFormData(data);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({
      id: "",
      image: "",
      name: "",
      color: "",
      origin: "",
      category: "",
      rate: 0,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Thêm mới dữ liệu
  const handleAdd = async () => {
    try {
      const response = await axios.post("/orchid", formData);
      if (response.status === 201) {
        setRows([response.data, ...rows]);
        handleCloseForm();
        setReload(true);
        alert("Successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Cập nhật dữ liệu
  const handleEdit = async () => {
    try {
      const response = await axios.put(`/orchid/${formData.id}`, formData);
      if (response.status === 200) {
        setReload(true);
        alert("Successfully!");
        handleCloseForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Xóa dữ liệu
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/orchid/${id}`);
      setReload(true);
      alert("Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const TableCellCustom = tableCell.map((item, index) => (
    <TableCell
      key={index}
      sx={{ textTransform: "capitalize", fontWeight: "bold" }}
    >
      {item}
    </TableCell>
  ));

  React.useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get("/orchid");
        if (request.status === 200 && request.data.length) {
          const response = request.data || [];
          setRows(response.reverse());
          setReload(false);
        }
      } catch (err) {
        throw err;
      }
    };
    if (reload) handleFetchData();
  }, [reload]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Button
          onClick={() => handleOpenForm("add")}
          variant="contained"
          sx={{ my: 2 }}
          style={{ backgroundColor: "rgb(102, 59, 45)" }}
        >
          Add New Orchid
        </Button>

        <Table>
          <TableHead>
            <TableRow>{TableCellCustom}</TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.name}</TableCell>
                  <TableCell>
                    <img
                      src={row.image}
                      alt="image orchid"
                      style={{ width: "200px" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      height={"40px"}
                      width={"40px"}
                      bgcolor={row.color}
                    ></Box>
                  </TableCell>
                  <TableCell>{row.origin}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <Rating
                      precision={0.5}
                      value={(parseInt(row.rate) / 100) * 5}
                      readOnly
                      name="simple-controlled"
                    ></Rating>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenForm("edit", row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3, 6, 9, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {formType === "add" ? "Add New Orchid" : "Edit Orchid"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            name="image"
            value={formData.image}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Color"
            type="text"
            fullWidth
            name="color"
            value={formData.color}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Origin"
            type="text"
            fullWidth
            name="origin"
            value={formData.origin}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Rate"
            type="number"
            fullWidth
            name="rate"
            value={formData.rate}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={formType === "add" ? handleAdd : handleEdit}>
            {formType === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrchidPage;
