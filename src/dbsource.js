export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "password",
    headerName: "Password",
    width: 160,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
];

export const clientColumns = [
  {
    field: "date",
    headerName: "Date",
    width: 120,
  },
  { field: "id", headerName: "ID", width: 30 },
  //{
  //  field: "name",
  //  headerName: "Name",
  //  width: 200,
  //  renderCell: (params) => {
  //    return (
  //      <div className="cellWithImg">
  //        <img className="cellImg" src={params.row.img} alt="avatar" />
  //        {params.row.name}
  //      </div>
  //    );
  //  },
  //},
  {
    field: "firstName",
    headerName: "First Name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 100,
  },
  {
    field: "age",
    headerName: "Age",
    width: 50,
  },
  {
    field: "sex",
    headerName: "Sex",
    width: 50,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  {
    field: "clientClass",
    headerName: "Class",
    width: 80,
  },
];
export const saleColumns = [
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  /*
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "memberId",
    headerName: "Member Id",
    width: 100,
  },
  */
  {
    field: "clientName",
    headerName: "Client Name",
    width: 150,
  },
  {
    field: "salespersonsName",
    headerName: "Salespersons Sold",
    flex: 1,
  },
  {
    field: "productsBoughtNames",
    headerName: "Products Bought",
    flex: 1,
  },
  {
    field: "totalSale",
    headerName: "Total Bought",
    flex: 1,
  },
];

export const productColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    /*
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
    */
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 200,
  },
];

export const locationColumns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "locationName",
    headerName: "Location Name",
    width: 200,
  },
];

export const clientschedColumns = [
  {
    field: "date",
    headerName: "Date",
    width: 120,
  },
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "clientName",
    headerName: "Client Name",
    width: 150,
  },
  {
    field: "facial",
    headerName: "Did Facial",
    width: 200,
  },
];

export const userscname = [{ type: "users" }];
export const clientscname = [{ type: "clients" }];
export const productscname = [{ type: "products" }];
export const salescname = [{ type: "sales" }];
export const locationscname = [{ type: "locations" }];
export const clientschedcname = [{ type: "clientschedules" }];
