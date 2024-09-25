import React, { useEffect, useState } from "react";
import { getPosts } from "../service";

import DataTable from "react-data-table-component";

import { Link } from "react-router-dom";

const Role = () => {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");
  // const [record , setRecord] = useState([])

  useEffect(() => {
    getPosts()
      .then((res) => setDatas(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const seacrhEvent = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  const handleFilter = () => {
    const newData = datas.filter((datas) => {
      return search.toLowerCase() === ""
        ? datas
        : datas.role.toLowerCase().includes(search) ||
            datas.status.toLowerCase().includes(search) ||
            datas._id.toString().includes(search);
    });

    setDatas(newData);
  };

  const handleDelete = (id) => {
    console.log(`Deleting item with id: ${id}`);
  };

  const columns = [
    {
      name: <h3>Id</h3>,
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: <h3>Role Name</h3>,
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: <h3>Status</h3>,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: <h3>Action</h3>,
      selector: (row) => row.action,
      cell: (row) => (
        <div>
          <button className="UpdateButton">
            <Link to={`/updatePost/${row._id}`}>Update</Link>
          </button>
          <button
            className="deleteButton"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="d-flex align-items-center">
        <div className="input-group ms-3 search-container">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search"
            onChange={seacrhEvent}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleFilter}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </h2>

      <DataTable
        columns={columns}
        data={datas}
        selectableRows
        fixedHeader
        pagination
      />

      <div className="createPost">
        <button className="UpdateButton createButton">
          <Link to="/createpost">Create Role</Link>
        </button>
      </div>
    </div>
  );
};

export default Role;
