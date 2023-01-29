import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "../ui/Table/Table";
import { axiosClient } from "../../axiosClient";
import { ADD_USERS_LIST } from "../../store/actions";
import Input from "../ui/Input/Input";

const Users = () => {
  const [id, setId] = useState("");
  const [searchVal, setSearch] = useState("");
  const [collection, setCollection] = useState([]);
  const [filterData, setData] = useState(collection);
  const [paginate, setPage] = useState({ page: 1 });

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers(1);
  }, []);
  const fetchUsers = (params) => {
    axiosClient.get(`users?page=${params}`).then((resp) => {
      dispatch({ type: ADD_USERS_LIST, payload: resp.data });
      setCollection(resp?.data?.data);
      setPage(resp?.data);
      setData(resp?.data?.data);
    });
  };
  const tableData = [
    [
      "ID",
      (item) => {
        return item.id;
      },
    ],
    [
      "Email",
      (item) => {
        return item.email;
      },
    ],
    [
      "First Name",
      (item) => {
        return item.first_name;
      },
    ],
    [
      "Last Name",
      (item) => {
        return item.last_name;
      },
    ],
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    let newCollection = [...collection];
    if (searchVal !== "") {
      newCollection = collection.filter((dataRow) => {
        return dataRow.id === parseInt(searchVal);
      });
    }
    if (newCollection.length) {
      setData(newCollection);
    } else {
      alert("Not Found");
    }
  };

  return (
    <div>
      <div className="table-filters">
        <form onSubmit={handleSearch}>
          <Input
            value={searchVal}
            onChange={(e) => setSearch(e.target.value)}
            label="Search : ID"
            name="id"
          />
        </form>
      </div>
      <Table tableData={tableData} apiData={filterData} />
      <Paginate page={paginate.page} fetchUsers={fetchUsers} />
    </div>
  );
};

export const Paginate = ({ page, fetchUsers }) => {
  return (
    <>
      <nav>
        <ul className="pagination mx-4">
          <li
            className={`page-item ${page === 1 ? "active" : ""}`}
            onClick={() => fetchUsers(1)}
          >
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li
            className={`page-item ${page === 2 ? "active" : ""}`}
            onClick={() => fetchUsers(2)}
          >
            <a className="page-link" href="#">
              2
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Users;
