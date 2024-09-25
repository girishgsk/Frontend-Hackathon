import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePosts } from "../service";
import Swal from "sweetalert2";

const UpdatePosts = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [values, setValues] = useState({
    id: id,
  });
  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setValues(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (values) {
      setImage(values.image);
    }
  }, [values]);

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        const data = res.data.data;
        setName(data.name);
        setEmail(data.email);
        setMobileNo(data.mobileNo);
        setRole(data.role);
        setStatus(data.status);
        setImage(null); // Keep the existing image or handle it as needed
      })
      .catch((err) => console.log(err));
  }, [id]);

  const valid = () => {
    let err = {};

    if (!name) {
      err = { ...err, name: true };
    }
    if (!email) {
      err = { ...err, email: true };
    }
    if (!mobileNo) {
      err = { ...err, mobileNo: true };
    }
    if (!role) {
      err = { ...err, role: true };
    }
    if (!status) {
      err = { ...err, status: true };
    }
    if (image === null && !image) {
      // Handle existing image properly
      err = { ...err, image: true };
    }

    setErrors(err);
    return Object.values(err).every((val) => !val);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (!valid()) {
      return false;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("Role", role);
    formData.append("status", status);

    if (image) {
      formData.append("image", image);
    }

    updatePosts(id, formData)
      .then((res) => {
        Swal.fire("Success!", "Employee updated successfully", "success");
        history("/user");
      })
      .catch((e) => {
        const message =
          typeof e.response.data.message === "string"
            ? e.response.data.message
            : e.response.data.message;
        Swal.fire("Error!", message, "error");
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobileNo":
        setMobileNo(value);
        break;
      case "Role":
        setRole(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "image":
        setImage(files[0]);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value,
    }));
  };

  return (
    <>
      <div
        style={{ height: "90vh", width: "80vw", margin: "auto" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="card">
          <div className="card-header">
            <h3>Update </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    errors.name ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={name}
                />
                {errors.name && (
                  <span className="text-danger">Please enter name</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={email}
                />
                {errors.email && (
                  <span className="text-danger">Please enter email</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile No
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  className={
                    errors.mobileNo
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter mobile no"
                  onChange={handleChange}
                  value={mobileNo}
                />
                {errors.mobileNo && (
                  <span className="text-danger">Please enter mobile no</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="Role" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className={
                    errors.Role ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter Role"
                  onChange={handleChange}
                  value={role}
                />
                {errors.Role && (
                  <span className="text-danger">Please enter Role</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="status" className="form-label">
                  status
                </label>
                <input
                  type="text"
                  name="status"
                  id="status"
                  className={
                    errors.status
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter status"
                  onChange={handleChange}
                  value={status}
                />
                {errors.status && (
                  <span className="text-danger">Please enter status</span>
                )}
              </div>
            </div>
            <div className="mt-2 form-group">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <div>
                <img
                  src={`http://localhost:3000/${values.image}`}
                  alt={`${values.image}`}
                  width="100"
                  height="100"
                />
              </div>

              <div>
                {image && (
                  <img
                    src={`http://localhost:3000/${image}`}
                    alt="Current"
                    width="100"
                    height="100"
                  />
                )}
              </div>
              <input
                type="file"
                name="image"
                id="image"
                className={
                  errors.image ? "form-control border-danger" : "form-control"
                }
                onChange={handleChange}
              />
              {errors.image && (
                <span className="text-danger">Please upload an image</span>
              )}
            </div>
            <div className="d-flex justify-content-center mt-2 col-12">
              <button className="btn btn-primary" onClick={postData}>
                Update Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePosts;
