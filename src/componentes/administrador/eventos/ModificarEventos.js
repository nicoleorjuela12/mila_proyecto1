import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importa SweetAlert2

const GestionEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [rangoFecha, setRangoFecha] = useState([0, new Date().getTime()]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/eventos') // Asegúrate de que esta URL sea correcta
            .then(response => {
                setEventos(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filtrarEventos = () => {
        return eventos.filter(evento => {
            const dentroRangoFecha = new Date(evento.fecha).getTime() >= rangoFecha[0] && new Date(evento.fecha).getTime() <= rangoFecha[1];
            const porCategoria = filtroCategoria ? evento.categoria === filtroCategoria : true;
            const porNombre = evento.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
            return dentroRangoFecha && porCategoria && porNombre && evento.estado === 'activo';
        });
    };

    const eliminarEvento = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción desactivará el evento.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, desactivar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:3000/eventos/${id}`, { estado: 'inactivo' }) // Asegúrate de que esta URL sea correcta
                    .then(() => {
                        setEventos(eventos.map(evento =>
                            evento.id === id ? { ...evento, estado: 'inactivo' } : evento
                        ));
                        Swal.fire(
                            'Desactivado!',
                            'El evento ha sido desactivado.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error('Error updating event:', error);
                        Swal.fire(
                            'Error!',
                            'Hubo un problema al desactivar el evento.',
                            'error'
                        );
                    });
            }
        });
    };

    const agruparPorCategoria = (eventos) => {
        return eventos.reduce((acc, evento) => {
            if (!acc[evento.categoria]) {
                acc[evento.categoria] = [];
            }
            acc[evento.categoria].push(evento);
            return acc;
        }, {});
    };

    const eventosPorCategoria = agruparPorCategoria(filtrarEventos());

    return (
        <div>
            <header>
                {/* Placeholder for header */}
            </header>
            <section>
                <div className="flex flex-col sm:flex-row justify-between mt-4 p-6">
                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                        className="border border-yellow-500 rounded-lg p-2 mb-4 sm:mb-0"
                        placeholder="Buscar por nombre"
                    />
                    <select
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className="border border-yellow-500 rounded-lg p-2 mb-4 sm:mb-0"
                    >
                        <option value="">Todas las categorías</option>
                        {Object.keys(eventosPorCategoria).map(categoria => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                    <div className="flex items-center">
                        <label htmlFor="rangoFecha" className="mr-2">Rango de fecha:</label>
                        <input
                            type="date"
                            value={new Date(rangoFecha[0]).toISOString().split('T')[0]}
                            onChange={(e) => setRangoFecha([new Date(e.target.value).getTime(), rangoFecha[1]])}
                            className="border border-yellow-500 rounded-lg p-2 mr-2 w-24"
                        />
                        <input
                            type="date"
                            value={new Date(rangoFecha[1]).toISOString().split('T')[0]}
                            onChange={(e) => setRangoFecha([rangoFecha[0], new Date(e.target.value).getTime()])}
                            className="border border-yellow-500 rounded-lg p-2 w-24"
                        />
                    </div>
                </div>

                {/* Interfaz de pestañas */}
                <div className="tabs-container">
                    <div className="tabs">
                        {Object.keys(eventosPorCategoria).map((categoria, index) => (
                            <button
                                key={index}
                                onClick={() => setCategoriaSeleccionada(categoria)}
                                className={`tab-button ${categoria === categoriaSeleccionada ? 'active' : ''}`}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                    <div className="tabs-content">
                        {categoriaSeleccionada && (
                            <div className="tab-content">
                                <div className="flex flex-col sm:flex-row justify-between mb-4 p-6">
                                    <input
                                        type="text"
                                        value={filtroNombre}
                                        onChange={(e) => setFiltroNombre(e.target.value)}
                                        className="border border-yellow-500 rounded-lg p-2 mb-4 sm:mb-0"
                                        placeholder={`Buscar por nombre en ${categoriaSeleccionada}`}
                                    />
                                    <div className="flex items-center">
                                        <label htmlFor="rangoFecha" className="mr-2">Rango de fecha:</label>
                                        <input
                                            type="date"
                                            value={new Date(rangoFecha[0]).toISOString().split('T')[0]}
                                            onChange={(e) => setRangoFecha([new Date(e.target.value).getTime(), rangoFecha[1]])}
                                            className="border border-yellow-500 rounded-lg p-2 mr-2 w-24"
                                        />
                                        <input
                                            type="date"
                                            value={new Date(rangoFecha[1]).toISOString().split('T')[0]}
                                            onChange={(e) => setRangoFecha([rangoFecha[0], new Date(e.target.value).getTime()])}
                                            className="border border-yellow-500 rounded-lg p-2 w-24"
                                        />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-semibold text-yellow-500 mb-4 text-center">{categoriaSeleccionada}</h2>
                                <div className="mx-auto grid max-w-8xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                                    {eventosPorCategoria[categoriaSeleccionada].map((evento) => (
                                        <article key={evento.id} className="event-card">
                                            <div className="relative flex items-end overflow-hidden rounded-xl h-40">
                                                <img src={evento.imagen} className="w-full h-full object-cover" alt={evento.nombre} />
                                            </div>
                                            <div className="mt-2 p-2">
                                                <h2 className="text-slate-700 text-xl font-semibold">{evento.nombre}</h2>
                                                <p className="mt-1 text-sm text-slate-400"><i><strong>ID: </strong></i>{evento.id}</p>
                                                <p className="mt-1 text-sm text-slate-400"><i><strong>DESCRIPCIÓN: </strong></i>{evento.descripcion}</p>
                                                <p className="text-lg font-bold text-purple-500">${evento.precio}</p>
                                                <p className="mt-1 text-sm text-slate-400"><i><strong>FECHA DEL EVENTO: </strong></i>{new Date(evento.fecha).toLocaleDateString()}</p>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <a href={`/eventos/ActualizarE?ID=${evento.id}`} className="flex items-center space-x-1.5 rounded-lg bg-yellow-400 px-5 py-2 text-white duration-100 hover:bg-yellow-500 border-2 border-yellow-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8" />
                                                            </svg>
                                                            <span>Actualizar</span>
                                                        </a>
                                                        <button onClick={() => eliminarEvento(evento.id)} className="flex items-center space-x-1.5 rounded-lg bg-red-400 px-5 py-2 text-white duration-100 hover:bg-red-500 border-2 border-red-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 4H8.998M10.917 4h8.083a.917.917 0 01.916.917V6.75H5.167V4.917A.917.917 0 016.083 4H10.917M12 11v6M9 11v6M15 11v6" />
                                                            </svg>
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GestionEventos;
