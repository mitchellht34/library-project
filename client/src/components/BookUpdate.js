import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function BookUpdate() {

    let { bookId } = useParams()

    return (
        <div>
            <h1>Book update {bookId}</h1>
        </div>
    )
}

export default BookUpdate;