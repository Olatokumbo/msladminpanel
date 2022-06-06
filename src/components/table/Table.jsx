import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const List = () => {
  const clientsrows = [
    {
      id: 13461,
      name: "Jane Doe",
      phone: "123456789",
      email: "A@A.com",
      address: "45 tripoli tower, bgc, taguig, manila",
      age: "50",
      dateCreated: "date",
      isMember: true,
      typeOfMember: "gold",
      facials: "10",
      rf: "5",
      companion: "1",
      isCallCenter: true,
    },
    {
      id: 1123246,
      name: "Michael Jackson",
      phone: "126789",
      email: "A@B.com",
      address: "45 trblafataguig, manila",
      age: "30",
      dateCreated: "date",
      isMember: true,
      typeOfMember: "vip",
      facials: "10",
      rf: "5",
      companion: "1",
      isCallCenter: true,
    },
  ];
  const rows = [
    {
      id: 2,
      clientId: "1123246",
      products: ["dayg ,", "night"],
      isWarranty: "true",
      warrantyId: "75765K",
    },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Sale Number</TableCell>
            <TableCell className="tableCell">Client Id</TableCell>
            <TableCell className="tableCell">Products</TableCell>
            <TableCell className="tableCell">Bought Machine</TableCell>
            <TableCell className="tableCell">Warranty Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.clientId}</TableCell>
              <TableCell>{[row.products]}</TableCell>
              <TableCell>{row.isWarranty}</TableCell>
              <TableCell>{row.warrantyId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
