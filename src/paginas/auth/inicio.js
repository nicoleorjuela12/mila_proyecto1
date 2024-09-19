import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext'; // Importa el contexto de usuario
import '../../index.css';

// Importa los componentes de barra de navegación
import BarraAdmin from '../../componentes/barras/BarraAdministrador';
import BarraCliente from '../../componentes/barras/BarraCliente';
import BarraMesero from '../../componentes/barras/BarraMesero';
import BarraNormal from "../../componentes/barras/barra_normal";

const Index = () => {
  const { role, setRole } = useContext(UserContext); // Obtén el rol del contexto
  const navigate = useNavigate();

  // Efecto para manejar la redirección al iniciar sesión
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    } else {
      navigate('/'); // Redirige a la página de inicio de sesión si no hay rol
    }
  }, [setRole, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole('normal');  // Restablece el rol al valor por defecto
    navigate('/');  // Redirige al inicio o página deseada
  };

  // Determina el componente de la barra de navegación según el rol
  let NavBarComponent = BarraNormal; // Valor por defecto

  if (role === 'administrador') {
    NavBarComponent = BarraAdmin;
  } else if (role === 'Cliente') {
    NavBarComponent = BarraCliente;
  } else if (role === 'mesero') {
    NavBarComponent = BarraMesero;
  }

  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [
    "https://media.istockphoto.com/id/1427778211/es/foto/comida-de-camarones-de-alta-cocina-en-el-plato.jpg?s=612x612&w=0&k=20&c=64-42xcRzHopOTV4NBo8mYCqdJpbs_v6z7K2JMhVNwY=",
    "https://media.istockphoto.com/id/1033045372/es/foto/camar%C3%B3n-frito-con-ajo-pimienta.jpg?s=612x612&w=0&k=20&c=B0-VyYS2qm3w_bO2BKwXE2KHbeZfhQbpmoBhMvRF2HA=",
    "https://media.istockphoto.com/id/1282748421/es/foto/tres-pasteles-de-postre-de-oto%C3%B1o-de-vacaciones-sobre-fondo-negro-semilla-de-amapola-caramelo.jpg?s=612x612&w=0&k=20&c=Fwg3OwXCpD_k-xUIxfFpMza4J0IXdSlwdByde5fIs48=",
    "https://media.istockphoto.com/id/1475100190/es/foto/desenfocado-mesa-oscura-borrosa-en-un-restaurante-o-bar.webp?a=1&b=1&s=612x612&w=0&k=20&c=UatF7bmQaazOckxN3P5ogElyudXnmzCteol5LC86MbA=",
    "https://media.istockphoto.com/id/1170693557/es/foto/c%C3%B3cteles-en-el-fondo-de-la-ciudad-nocturna-h.jpg?s=612x612&w=0&k=20&c=-ZtZt3dXbzrjb23uwPduJa29euIiZLmkzzbfMUnTTgc="
  ];

  const texts = [
    "¡Descubre los sabores únicos de Mila! Cada plato es una experiencia gastronómica inolvidable.",
    "Disfruta de una cena elegante en nuestro gastro bar con una selección de vinos exclusivos.",
    "Nuestra cocina innovadora fusiona ingredientes frescos para crear platillos sorprendentes.",
    "Ven y prueba nuestras deliciosas tapas, perfectas para compartir en un ambiente acogedor.",
    "En Mila, cada comida es una celebración. ¡Reserva tu mesa y vive una experiencia culinaria excepcional!"
  ];

  const back = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : images.length));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length ? prevIndex + 1 : 1));
  };

  useEffect(() => {
    const id = setInterval(() => {
      next();
    }, 3000); // Cambiar cada 3 segundos

    return () => clearInterval(id); // Limpiar intervalo al desmontar el componente
  }, []);

  return (
    <div className="relative">
      {images.map((image, index) => (
        <figure
          key={index}
          className={`absolute inset-0 w-11/12 h-full mx-auto ${currentIndex === index + 1 ? 'block' : 'hidden'}`}
        >
          <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gray-900 bg-opacity-60 text-white p-4 text-center text-sm">
            <p>{texts[index]}</p>
          </figcaption>
        </figure>
      ))}

      {/* Botones de navegación */}
      <div>
        <button onClick={back} className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-3">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={next} className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full p-3">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index + 1)}
            className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index + 1 ? 'bg-yellow-500' : 'bg-gray-400'}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Index;
