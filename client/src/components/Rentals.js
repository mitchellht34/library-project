import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function Rentals({rentals, setRentals, selectedUser, selectedBook, refreshPage, setRefreshPage}) {

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  const formSchema = yup.object().shape({
    copies: yup.number().positive().integer().required("Must enter a number of Copies").typeError("Please enter an Integer").max(125),
  });

  const formik = useFormik({
    initialValues: {
      user: selectedUser.id,
      book: selectedBook.id,
      copies: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        console.log({
            ...values,
            user: selectedUser.id,
            book: selectedBook.id
        });
        fetch("http://127.0.0.1:5555/rentals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            user_id: selectedUser.id,
            book_id: selectedBook.id
        }),
        }).then((res) => {
          console.log(values)
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
      <h3>Rentals</h3>
      {rentals === "undefined" ? (
        <p>Loading</p>
      ) : (
        rentals.map((rental, i) => (
            <div className="list">
                <li key={i}>
                    {rental.user ? `${rental.user.name} rented ${rental.copies} ${rental.copies > 1 ? "copies" : "copy"} of ${rental.book.title}` : <p>No rental</p>}
                </li>
                <br/>
                <br/>
            </div>
        ))
      )}
    </div>
  );
}

export default Rentals;