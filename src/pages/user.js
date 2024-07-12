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
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import axios from "axios";
import * as React from "react";

const tableCell = ["id", "avatar", "name", "email", "role", "action"];

function UserPage() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
  const [reload, setReload] = React.useState(true);

  const [openForm, setOpenForm] = React.useState(false);
  const [formType, setFormType] = React.useState(""); // "add" hoặc "edit"
  const [formData, setFormData] = React.useState({
    id: "",
    avatar: "",
    name: "",
    email: "",
    password: "",
    role: "",
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
      avatar: "",
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Thêm mới dữ liệu
  const handleAdd = async () => {
    try {
      const response = await axios.post("/user", formData);
      if (response.status === 201) {
        handleCloseForm();
        setReload(true);
        alert("Successfully added!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Cập nhật dữ liệu
  const handleEdit = async () => {
    try {
      const response = await axios.put(`/user/${formData.id}`, formData);
      if (response.status === 200) {
        setReload(true);
        alert("Successfully updated!");
        handleCloseForm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Xóa dữ liệu
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/user/${id}`);
      setReload(true);
      alert("Successfully deleted!");
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
        const request = await axios.get("/user");
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
          Add New User
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
                <TableRow key={row.id} sx={{ fontWeight: "bold" }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <img
                      src={row.avatar}
                      alt="avatar"
                      style={{ width: "50px", borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {row.role}
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
                rowsPerPageOptions={[7, 14, 21, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>
          {formType === "add" ? "Add New User" : "Edit User"}
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
          <Select
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            fullWidth
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            defaultValue=""
          >
            <MenuItem value="">--Select Role--</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            onClick={formType === "add" ? handleAdd : handleEdit}
            variant="contained"
          >
            {formType === "add" ? "Add" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserPage;
