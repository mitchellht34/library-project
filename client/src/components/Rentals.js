import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Rentals() {

  const [books, setBooks] = useState([{}]);
  const [users, setUsers] = useState([{}]);
  const [rentals, setRentals] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  useEffect(() => {
    console.log("FETCH! ");
    fetch("http://127.0.0.1:5555/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        console.log("books", data);
      });
    fetch("http://127.0.0.1:5555/users")
    .then((res) => res.json())
    .then((data) => {
    setUsers(data);
    console.log("users", data);
    });
    fetch("http://127.0.0.1:5555/rentals")
    .then((res) => res.json())
    .then((data) => {
      setRentals(data);
      console.log("rentals",data);
    });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    copies: yup.number().positive().integer().required("Must enter a number of Copies").typeError("Please enter an Integer").max(125),
  });

  const formik = useFormik({
    initialValues: {
      copies: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch("http://127.0.0.1:5555/rentals", {
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
        <label htmlFor="copies">Copies</label>
        <br />

        <input
          id="copies"
          copies="copies"
          onChange={formik.handleChange}
          value={formik.values.copies}
        />
        <p style={{ color: "red" }}> {formik.errors.copies}</p>

        <br />

        <button type="submit">Submit</button>
      </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>copies</th>
          </tr>
          {rentals === "undefined" ? (
            <p>Loading</p>
          ) : (
            rentals.map((rental, i) => (
              <>
                <tr key={i}>
                  <td>{rental.copies}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Rentals;