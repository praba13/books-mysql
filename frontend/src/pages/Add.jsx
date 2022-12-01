import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Add = () => {

    const [book, setBook] = useState({
        title: "",
        desc: "",
        price: "",
        cover: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/books", book); //object book
            navigate('/');
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    console.log(book);

    return (
        <div className='form' >
            <h1>Add New PR-BOOK</h1>
            <input type="text" placeholder='Book Title' onChange={handleChange} name="title" />
            <input type="text" placeholder='Book Desc' onChange={handleChange} name="desc" />
            <input type="number" placeholder='Book Price' onChange={handleChange} name="price" />
            <input type="text" placeholder='Book cover' onChange={handleChange} name="cover" />
            <button onClick={handleClick} className='formButton' >Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all books</Link>
        </div>
    );
};

export default Add;