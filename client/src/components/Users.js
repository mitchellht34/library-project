import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Users({users, setUsers, selectedUser, setSelectedUser, refreshPage, setRefreshPage}) {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  function handleUserClick(user){
    setSelectedUser(user)
    console.log(user)
  }

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").max(20),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch("http://127.0.0.1:5555/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values, null, 2),
        }).then((res) => {
          if (res.status == 201) {
            setRefreshPage(!refreshPage);
            formik.resetForm()
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="name">Name</label>
        <br />

        <input
          id="name"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <br />

        <button type="submit">Submit</button>
      </form>
      <h3>Name</h3>
      {users === "undefined" ? (
        <p>Loading</p>
      ) : (
        users.map((user, i) => (
            <div className="list">
                <li key={i}>{user.name}</li>
                <button onClick={() => handleUserClick(user)}>{user === selectedUser ? "User Chosen!" : "Select User"}</button>
                <br/>
                <br/>
            </div>
        ))
      )}
    </div>
  );
}

export default Users;