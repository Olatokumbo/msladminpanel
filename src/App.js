import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import SingleUser from "./pages/single/SingleUser";
import NewUser from "./pages/new/newuser/NewUser";
import NewClient from "./pages/new/newclient/NewClient";
import NewSale from "./pages/new/newsale/NewSale";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  userColumns,
  clientColumns,
  productColumns,
  saleColumns,
  userscname,
  clientscname,
  productscname,
  salescname,
  locationColumns,
  locationscname,
  clientschedColumns,
  clientschedcname,
} from "./dbsource";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SingleClient from "./pages/single/singleclient/SingleClient";
import NewProduct from "./pages/new/newproduct/NewProduct";
import NewLocation from "./pages/new/newlocation/NewLocation";
import NewClientSchedule from "./pages/new/newclientschedule/NewClientSchedule";
import Location from "./pages/location/Location";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List inputs={userColumns} dbtype={userscname} />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <SingleUser dbtype={userscname} />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewUser dbtype={userscname} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="clients">
              <Route
                index
                element={
                  <RequireAuth>
                    <List inputs={clientColumns} dbtype={clientscname} />
                  </RequireAuth>
                }
              />
              <Route
                path=":clientId"
                element={
                  <RequireAuth>
                    <SingleClient dbtype={clientscname} />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewClient dbtype={clientscname} title="Add New Client" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="sales">
              <Route
                index
                element={
                  <RequireAuth>
                    <List inputs={saleColumns} dbtype={salescname} />
                  </RequireAuth>
                }
              />
              <Route
                path=":saleId"
                element={
                  <RequireAuth>
                    <SingleClient dbtype={clientscname} />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewSale dbtype={salescname} title="Add New Sale" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List inputs={productColumns} dbtype={productscname} />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewProduct
                      dbtype={productscname}
                      title="Add New Product"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="locations">
              <Route
                index
                element={
                  <RequireAuth>
                    <List inputs={locationColumns} dbtype={locationscname} />
                  </RequireAuth>
                }
              />
              <Route
                path=":locationId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewLocation
                      dbtype={locationscname}
                      title="Add New Location"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="clientSchedules">
              <Route
                index
                element={
                  <RequireAuth>
                    <List
                      inputs={clientschedColumns}
                      dbtype={clientschedcname}
                    />
                  </RequireAuth>
                }
              />
              <Route
                path=":clientScheduleId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <NewClientSchedule
                      dbtype={clientschedcname}
                      title="Add New Client Schedule"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="shangrila">
              <Route
                index
                element={
                  <RequireAuth>
                    <Location />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="manilabay">
              <Route
                index
                element={
                  <RequireAuth>
                    <Location />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="festival">
              <Route
                index
                element={
                  <RequireAuth>
                    <Location />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
