import React, { useEffect, useState } from "react";
import { useParams, } from "react-router-dom/cjs/react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function BookUpdate({books, refreshPage, setRefreshPage}) {

    let { bookId } = useParams()

    const found = books.find((book) => book.id === parseInt(bookId))

    const formSchema = yup.object().shape({
        title: yup.string(),
        author: yup.string()
      });
    
      const formik = useFormik({
        initialValues: {
          title: "",
          author: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            let newValue = {};
            if(values.title){
                newValue = {
                    ...newValue, 
                    title: values.title
                }
            }
            if(values.author){
                newValue = {
                    ...newValue,
                    author: values.author
                }
            }
            fetch(`http://127.0.0.1:5555/books/${bookId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newValue),
            }).then((res) => {
              if (res.status == 200) {
                setRefreshPage(!refreshPage);
                formik.resetForm()
            }
          });
        },
      });

      return (
        found ? (<div>
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
        </div>) : <h2>Book Not Found</h2>
      );
    }

export default BookUpdate;