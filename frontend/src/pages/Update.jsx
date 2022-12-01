import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Update = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8800/books/${bookId}`, book);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className='form' >
            <h1>Update PR-Book</h1>
            <input type="text" name="title" id="" placeholder='Book Title' onChange={handleChange} />
            <textarea type="text" name="desc" id="" rows={5} placeholder='Book Desc' onChange={handleChange} />
            <input type="number" name="price" id="" placeholder='Book Price' onChange={handleChange} />
            <input type="text" name="cover" id="" placeholder='Book Cover' onChange={handleChange} />
            <button className='formButton' onClick={handleClick} >Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Update;