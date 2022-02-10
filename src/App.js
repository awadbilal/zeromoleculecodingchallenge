import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Home from './Containers/Home';
import CreateOrEdit from './Components/Home/CreateOrEdit';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function App() {

  const [movies, setMovies] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem("token")) {
      axios.get("https://zm-movies-assignment.herokuapp.com/api/movies?populate=*")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      navigate("/");
    }
    else navigate("/login");
  }, [])

  useEffect(() => {
    if(sessionStorage.getItem("token")) axios.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
  }, [Window.reload])

  return (
    <Container className="App">
      <Routes>
        <Route exact path="/" element={<Home movies={movies} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-movie" element={<CreateOrEdit type="create" />} />
        <Route path="/edit-movie" element={<CreateOrEdit type="edit" />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
