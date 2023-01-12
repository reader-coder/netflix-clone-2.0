import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Account from './pages/Account';
import Signup from './pages/Signup';
import ProtectedRoute from "./components/ProtectedRoute";
import MovieDetails from "./components/MovieDetails";



function App() {
  return (
    <>
    <AuthContextProvider>
     <Navbar/>
     <Routes>
            <Route path='/' element={<Home/>}/>
              <Route path=":movieId" element={<MovieDetails/>}>
            </Route>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/signup" element={<Signup/>}/>   
            <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>     
      </Routes>
     </AuthContextProvider>
    </>
  );
}

export default App;
