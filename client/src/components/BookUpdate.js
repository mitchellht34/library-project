import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom/cjs/react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function BookUpdate({books, setBooks, selectedUser, selectedBook, setSelectedBook, refreshPage, setRefreshPage}) {

    let { bookId } = useParams()

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(40),
        author: yup.string().required("Must enter an author").max(20)
      });
    
      const formik = useFormik({
        initialValues: {
          title: "",
          author: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/books", {
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
          <h3>Update Book</h3>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="title">Title</label>
            <br />
    
            <input
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <p style={{ color: "red" }}> {formik.errors.title}</p>
    
            <label htmlFor="author">Author</label>
            <br />
    
            <input
              id="author"
              name="author"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            <p style={{ color: "red" }}> {formik.errors.author}</p>
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }

export default BookUpdate;