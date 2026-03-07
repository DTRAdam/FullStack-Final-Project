import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import PageNotFound from './components/PageNotFound';
import About from './components/About';
import Footer from './components/Footer';
import AOS from "aos";
import 'aos/dist/aos.css';
import Home from './components/Home';
import Products from './components/Products';
import 'typeface-montserrat';
import Register from './components/Register';
import LogIn from './components/LogIn';
import Crm from './components/Crm';
import Titles from './components/Titles';
import CartC from './components/CartC';
import FavoritesProduct from './components/FavoritesProduct';
import { useEffect, useState } from 'react';
import { Product } from './interfaces/products';
import Swal from 'sweetalert2';
import Profile from './components/Profile';
import { authAdminContext, AuthProvider } from './context/isLoggedInContext';
import Sproduct from './components/Sproduct';

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [favorites, setFavorites] = useState<Product[]>(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleFavoriteToggle = (product: Product) => {

    const isFavorite = favorites.some(fav => fav._id === product._id);


    if (isFavorite) {
      Swal.fire("Removed!", `${product.title} has been removed from your favorites.`, "success");
    } else {
      Swal.fire("Added!", `${product.title} has been added to your favorites.`, "success");
    }

    setFavorites(prevFavorites => {
      if (isFavorite) {

        return prevFavorites.filter(fav => fav._id !== product._id);
      } else {

        return [...prevFavorites, product];
      }
    });
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  return (

    <AuthProvider value={{ isLoggedIn, setIsLoggedIn }}>
      <authAdminContext.Provider value={{ isAdmin, setIsAdmin }}>

        <div className="App">
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/titles" element={<Titles />} />
              <Route path="/products" element={<Products handleFavoriteToggle={handleFavoriteToggle} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sproduct/:id" element={<Sproduct />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/crm" element={<Crm />} />
              <Route path="/cartc" element={<CartC />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favoritesproduct" element={<FavoritesProduct favorites={favorites} />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
          </Router>
        </div>

      </authAdminContext.Provider>
    </AuthProvider>
  );
}

export default App;