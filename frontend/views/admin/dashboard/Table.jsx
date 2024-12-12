import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'Id', label: 'Mã đơn hàng', minWidth: 100 },
  { id: 'studentId', label: 'MSSV', minWidth: 170 },
  { id: 'customerName', label: 'Tên khách hàng', minWidth: 170 },
  { id: 'orderDate', label: 'Ngày đặt hàng', minWidth: 170 },
  { id: 'orderStatus', label: 'Trạng thái đơn hàng', minWidth: 170 },
  { id: 'totalAmount', label: 'Tổng số tiền', minWidth: 170 },
  { id: 'paymentMethod', label: 'Phương thức thanh toán', minWidth: 170 },
  { id: 'items', label: 'Mã sản phẩm', minWidth: 170 },
  { id: 'phoneNumber', label: 'Số điện thoại', minWidth: 170 },
];

function createData(Id, studentId, customerName, orderDate, orderStatus, totalAmount, paymentMethod, items, phoneNumber) {
  return { Id, studentId, customerName, orderDate, orderStatus, totalAmount, paymentMethod, items, phoneNumber };
}

const rows = [
  createData('001', '2252222', 'John Doe', '12/12/2024', 'Shipped', '$150.00', 'Credit Card', 3, '012345789'),
  createData('002', '2252222', 'Jane Smith', '12/12/2024', 'Pending', '$50.00', 'PayPal', 2, '012345789'),
  createData('003', '2252222', 'Mike Johnson', '12/12/2024', 'Delivered', '$75.00', 'Cash on Delivery', 1, '012345789'),
  createData('004', '2252222', 'Emily Brown', '12/12/2024', 'Shipped', '$120.00', 'Credit Card', 2, '012345789'),
  createData('005', '2252222', 'David Lee', '12/12/2024', 'Cancelled', '$200.00', 'PayPal', 5, '012345789'),
  createData('006', '2252222', 'Sarah White', '12/12/2024', 'Shipped', '$90.00', 'Credit Card', 1, '012345789'),
];

export default function DataTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div className="overflow-x-auto">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
