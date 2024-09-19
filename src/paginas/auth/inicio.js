import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Mila INDEX</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

      {/* Renderiza la barra correspondiente */}
      <NavBarComponent />

      {/* Contenido de la página */}
      <div className="container mx-auto pt-5">
        {/* SERVICIOS */}
        <div className="relative text-center py-[115px] pb-[35px]">
          <h4 className="tracking-widest text-black">Nuestros Servicios</h4>
          <h1 className="text-4xl font-bold">Comida Fresca &amp; Natural</h1>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="service-1.jpg" alt="Organización de Eventos" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-calendar service-icon" />Organización de Eventos</h4>
                <p className="m-0">En Mila, ofrecemos un servicio de organización de eventos para hacer de tu ocasión especial un momento inolvidable. Nos encargamos de todos los detalles para que tú puedas disfrutar.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="service-2.jpg" alt="Reservas" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-book service-icon" />Reservas</h4>
                <p className="m-0">Facilitamos el proceso de reservas para que siempre tengas un lugar en nuestro restaurante. Ya sea para una cena con tu pareja o una reunión familiar, puedes reservar con antelación.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="service-3.jpg" alt="Pedidos" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-bullhorn service-icon" />Pedidos</h4>
                <p className="m-0">Realiza tus pedidos de manera rápida y sencilla a través de nuestro sistema en línea. Ofrecemos un servicio eficiente para que disfrutes de tus comidas favoritas sin complicaciones.</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-5">
            <div className="flex items-center">
              <div className="w-2/5">
                <img className="w-full mb-3 lg:mb-0" src="service-4.jpg" alt="Disfruta con la Familia" />
              </div>
              <div className="w-3/5 pl-4">
                <h4 className="text-xl"><i className="fa fa-utensils service-icon" />Productos</h4>
                <p className="m-0">En Mila, queremos que disfrutes momentos especiales con tu familia. Nuestro ambiente acogedor y nuestro menú variado son perfectos para pasar tiempo de calidad juntos y que realices diferentes pedidos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* SOBRE NOSOTROS */}
        <div className="container mx-auto py-5">
          <div className="relative text-center py-[115px] pb-[35px]">
            <h4 className="tracking-widest text-black"><b>Sobre Nosotros</b></h4>
            <h1 className="text-4xl font-bold"><b>Sirviendo desde 2018</b></h1>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 px-4 py-5">
              <h1 className="text-2xl mb-3">Nuestra Misión</h1>
              <p>En Luz Mila gastro fusión, nuestra misión es ofrecer una experiencia gastronómica única que combina la tradición culinaria con la innovación moderna. Nos comprometemos a utilizar ingredientes frescos y locales, preparados con pasión y creatividad, para deleitar a nuestros clientes con platos que celebran la riqueza de la cocina regional e internacional. Buscamos crear un ambiente acogedor y sofisticado donde cada visita sea memorable y cada plato cuente una historia.</p>
            </div>
            <div className="w-full lg:w-1/3 px-4 py-5 relative min-h-[500px]">
              <img className="absolute inset-0 w-full h-full object-cover" src="about.png" alt="Sobre Nosotros" />
            </div>
            <div className="w-full lg:w-1/3 px-4 py-5">
              <h1 className="text-2xl mb-3">Nuestra Visión</h1>
              <p>Ser reconocidos como el gastrobar de referencia en nuestra comunidad, famoso por nuestra cocina excepcional, nuestro servicio al cliente impecable y nuestro compromiso con la sostenibilidad. Aspiramos a expandir nuestra marca y abrir nuevas ubicaciones, manteniendo siempre nuestros valores de calidad y excelencia. Queremos ser un lugar donde las personas se reúnan para celebrar momentos especiales y disfrutar de una experiencia culinaria inigualable.</p>
              <h5 className="flex items-center mb-3"><i className="fa fa-check text-primary mr-2" />Los mejores servicios</h5>
              <h5 className="flex items-center mb-3"><i className="fa fa-check text-primary mr-2" />La mejor calidad en nuestras comidas</h5>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="container mx-auto pt-5">
          <div className="relative text-center py-[115px] pb-[35px]">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-[100px] bg-[#DA9F5B]" />
          </div>
          <h1 className="text-4xl font-bold mb-5 text-center">Experiencia Gourmet Única</h1>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-5">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img className="w-24 h-24 mx-auto mb-4" src="gourmet.png" alt="Experiencia Gourmet" />
                <h3 className="text-xl font-semibold mb-2">Experiencia Gourmet</h3>
                <p>Disfruta de una experiencia culinaria excepcional con nuestros platos gourmet preparados por chefs expertos.</p>
                <Link to="/reservar" className="block mt-4 text-blue-600 hover:underline">Reserva ahora</Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-5">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img className="w-24 h-24 mx-auto mb-4" src="local.png" alt="Ambiente Agradable" />
                <h3 className="text-xl font-semibold mb-2">Ambiente Agradable</h3>
                <p>Relájate en un ambiente acogedor y elegante que te hará sentir como en casa.</p>
                <Link to="/local" className="block mt-4 text-blue-600 hover:underline">Más información</Link>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-5">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <img className="w-24 h-24 mx-auto mb-4" src="specials.png" alt="Ofertas Especiales" />
                <h3 className="text-xl font-semibold mb-2">Ofertas Especiales</h3>
                <p>Aprovecha nuestras ofertas especiales y promociones exclusivas para disfrutar aún más de tu experiencia.</p>
                <Link to="/ofertas" className="block mt-4 text-blue-600 hover:underline">Ver ofertas</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
