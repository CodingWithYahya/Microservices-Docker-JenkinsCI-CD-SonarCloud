import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export function Hotel() {
    const [hotels, setHotels] = useState([]);
    const [nbHotels, setNbHotels] = useState();
    const [villes, setVilles] = useState([]);
    const [newHotel, setNewHotel] = useState({
        nom: '',
        adresse: '',
        ville: {
            id: ''
        }
    }
    );
    const [patchedHotel, setPatchedHotel] = useState({
        id: '',
        nom: '',
        adresse: '',
        ville: {
            id: ''
        }
    });

    const displayAll = () => {
        fetch('SERVICE-CHAMBRE/api/hotel/findAll')
            .then(response => response.json())
            .then(data => setHotels(data))
            .catch(error => console.log(error));
    };

    const countHotels = () => {
        fetch('SERVICE-CHAMBRE/api/hotel/count')
            .then(response => response.json())
            .then(data => setNbHotels(data))
            .catch(error => console.log(error));
    };

    const findVilles = () => {
        fetch('SERVICE-CHAMBRE/api/ville/findAll')
            .then(response => response.json())
            .then(data => setVilles(data))
            .catch(error => console.log(error));
    };

    const addNewHotel = () => {
        fetch('SERVICE-CHAMBRE/api/hotel/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: newHotel.nom,
                adresse: newHotel.adresse,
                ville: {
                    id: newHotel.ville.id
                }
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("hotel added successfully");
                    toast.success('Succès');
                    countHotels();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        addNewHotel();
        setNewHotel({
            nom: '',
            adresse: '',
            ville: {
                id: ''
            }
        });
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleCancelAdd = (e) => {
        setNewHotel({
            nom: '',
            adresse: '',
            ville: {
                id: ''
            }
        });
        e.preventDefault();
    }
    const handleCancelMod = (e) => {
        setPatchedHotel({
            id: '',
            nom: '',
            adresse: '',
            ville: {
                id: ''
            }
        });
        e.preventDefault();
    }

    const handlePatch = (hotel) => {
        setPatchedHotel({ ...hotel });
        handleScrollToTop();
    };

    const handleSubmitPatch = (e) => {
        e.preventDefault();
        patchHotel();
        setPatchedHotel({
            id: '',
            nom: '',
            adresse: '',
            ville: {
                id: ''
            }
        })
    };

    const deleteHotel = (id) => {
        fetch(`SERVICE-CHAMBRE/api/hotel/delete/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Hotel deleted successfully');
                    toast.success('Succès');
                    countHotels();
                    displayAll();
                }
                else
                    toast.error('Echec, cet attribut ne peut pas être supprimé maintenant!');
            })
            .catch(error => {
                console.error('Error deleting hotel:', error);
            });
    };

    const handleDelete = (id) => {
        deleteHotel(id);
        setPatchedHotel({
            id: '',
            nom: '',
            adresse: '',
            ville: {
                id: ''
            }
        })
    };
    const patchHotel = () => {
        fetch('SERVICE-CHAMBRE/api/hotel/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: patchedHotel.id,
                nom: patchedHotel.nom,
                adresse: patchedHotel.adresse,
                ville: {
                    id: patchedHotel.ville.id
                }
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("hotel patched successfully");
                    toast.success('Succès');
                    countHotels();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        countHotels();
        displayAll();
        findVilles();
    }, []);

    return (
        <>
        <Navbar></Navbar>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                    <form className="" onSubmit={handleSubmitAdd}>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2">Ajouter</legend>
                            <h3 className='mx-2'>Hotel</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='nom'
                                    required={true}
                                    value={newHotel.nom}
                                    onChange={(e) => setNewHotel({ ...newHotel, nom: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='adresse'
                                    required={true}
                                    value={newHotel.adresse}
                                    onChange={(e) => setNewHotel({ ...newHotel, adresse: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={newHotel.ville.id}
                                    onChange={(e) => setNewHotel({ ...newHotel, ville: { ...newHotel.ville, id: e.target.value } })}
                                >
                                    <option>Sélectionnez une ville</option>
                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2" type='submit'>Valider</button>
                                <button className="btn btn-danger mx-2" onClick={handleCancelAdd}>Annuler</button>
                            </div>
                        </fieldset>
                    </form>
                    <form className='' onSubmit={handleSubmitPatch}>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2">Modifier</legend>
                            <h3 className='mx-2'>Hotel</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='nom'
                                    required={true}
                                    value={patchedHotel.nom}
                                    onChange={(e) => setPatchedHotel({ ...patchedHotel, nom: e.target.value })}
                                >
                                </input>
                            </div>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='adresse'
                                    required={true}
                                    value={patchedHotel.adresse}
                                    onChange={(e) => setPatchedHotel({ ...patchedHotel, adresse: e.target.value })}
                                >
                                </input>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={patchedHotel.ville.id}
                                    onChange={(e) => setPatchedHotel({ ...patchedHotel, ville: { ...patchedHotel.ville, id: e.target.value } })}
                                >
                                    <option>Sélectionnez une ville</option>
                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-primary mx-2" type='submit'>Valider</button>
                                <button className="btn btn-danger mx-2" onClick={handleCancelMod}>Annuler</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            <br />
            <hr />
            <br />
            {(nbHotels > 0) && (
                <div>
                    <div className="flex items-center justify-center">
                        <h1 className="text-xl">Liste des hotels: {nbHotels}</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                        {hotels.map((hotel) => (
                            <div key={hotel.id} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Adresse:</p>
                                        <p>{hotel?.nom}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Adresse:</p>
                                        <p>{hotel?.adresse}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Ville:</p>
                                        <p>{hotel?.ville?.label}</p>
                                    </div>
                                    <div className="card-actions flex items-center justify-center">
                                        <button className="btn btn-secondary mx-2" onClick={() => handlePatch(hotel)}>Modifier</button>
                                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(hotel.id)}>Supprimer</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
            )}
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
}