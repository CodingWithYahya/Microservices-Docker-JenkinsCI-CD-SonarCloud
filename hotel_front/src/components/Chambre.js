import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export function Chambre() {
    const [chambres, setChambres] = useState([]);
    const [nbChambres, setNbChambres] = useState();
    const [hotels, setHotels] = useState([]);
    const dispoValues = [
        "True",
        "False"
    ];
    const [newChambre, setNewChambre] = useState({
        label: '',
        dispo: '',
        hotel: {
            id: ''
        }
    }
    );
    const [patchedChambre, setPatchedChambre] = useState({
        id: '',
        label: '',
        dispo: '',
        hotel: {
            id: ''
        }
    });

    const displayAll = () => {
        fetch('SERVICE-CHAMBRE/api/chambre/findAll')
            .then(response => response.json())
            .then(data => setChambres(data))
            .catch(error => console.log(error));
    };

    const countChambres = () => {
        fetch('SERVICE-CHAMBRE/api/chambre/count')
            .then(response => response.json())
            .then(data => setNbChambres(data))
            .catch(error => console.log(error));
    };

    const findHotels = () => {
        fetch('SERVICE-CHAMBRE/api/hotel/findAll')
            .then(response => response.json())
            .then(data => setHotels(data))
            .catch(error => console.log(error));
    };

    const addNewChambre = () => {
        fetch('SERVICE-CHAMBRE/api/chambre/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                label: newChambre.label,
                dispo: newChambre.dispo,
                hotel: {
                    id: newChambre.hotel.id
                }
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("chambre added successfully");
                    toast.success('Succès');
                    countChambres();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        addNewChambre();
        setNewChambre({
            label: '',
            dispo: '',
            hotel: {
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
        setNewChambre({
            label: '',
            dispo: '',
            hotel: {
                id: ''
            }
        });
        e.preventDefault();
    }
    const handleCancelMod = (e) => {
        setPatchedChambre({
            id: '',
            label: '',
            dispo: '',
            hotel: {
                id: ''
            }
        });
        e.preventDefault();
    }

    const handlePatch = (chambre) => {
        setPatchedChambre({ ...chambre });
        handleScrollToTop();
    };

    const handleSubmitPatch = (e) => {
        e.preventDefault();
        patchChambre();
        setPatchedChambre({
            id: '',
            label: '',
            dispo: '',
            hotel: {
                id: ''
            }
        })
    };

    const deleteChambre = (id) => {
        fetch(`SERVICE-CHAMBRE/api/chambre/delete/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Chambre deleted successfully');
                    toast.success('Succès');
                    countChambres();
                    displayAll();
                }
                else
                    toast.error('Echec, cet attribut ne peut pas être supprimé maintenant!');
            })
            .catch(error => {
                console.error('Error deleting chambre:', error);
            });
    };

    const handleDelete = (id) => {
        deleteChambre(id);
        setPatchedChambre({
            id: '',
            label: '',
            dispo: '',
            hotel: {
                id: ''
            }
        })
    };
    const patchChambre = () => {
        fetch('SERVICE-CHAMBRE/api/chambre/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: patchedChambre.id,
                label: patchedChambre.label,
                dispo: patchedChambre.dispo,
                hotel: {
                    id: patchedChambre.hotel.id
                }
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("chambre patched successfully");
                    toast.success('Succès');
                    countChambres();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        countChambres();
        displayAll();
        findHotels();
    }, []);

    return (
        <>
        <Navbar></Navbar>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                    <form className="" onSubmit={handleSubmitAdd}>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2">Ajouter</legend>
                            <h3 className='mx-2'>Chambre</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='label'
                                    required={true}
                                    value={newChambre.label}
                                    onChange={(e) => setNewChambre({ ...newChambre, label: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={newChambre.dispo}
                                    onChange={(e) => setNewChambre({ ...newChambre, dispo: e.target.value })}
                                >
                                    <option>Choisissez la disponibilité</option>
                                    {dispoValues.map((dispo) => (
                                        <option key={dispo} value={dispo}>
                                            {dispo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={newChambre.hotel.id}
                                    onChange={(e) => setNewChambre({ ...newChambre, hotel: { ...newChambre.hotel, id: e.target.value } })}
                                >
                                    <option>Sélectionnez un hotel</option>
                                    {hotels.map((hotel) => (
                                        <option key={hotel.id} value={hotel.id}>
                                            {hotel.nom}
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
                            <h3 className='mx-2'>Chambre</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='label'
                                    required={true}
                                    value={patchedChambre.label}
                                    onChange={(e) => setPatchedChambre({ ...patchedChambre, label: e.target.value })}
                                >
                                </input>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={patchedChambre.dispo}
                                    onChange={(e) => setPatchedChambre({ ...patchedChambre, dispo: e.target.value })}
                                >
                                    <option>Choisissez la disponibilité</option>
                                    {dispoValues.map((dispo) => (
                                        <option key={dispo} value={dispo}>
                                            {dispo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={patchedChambre.hotel.id}
                                    onChange={(e) => setPatchedChambre({ ...patchedChambre, hotel: { ...patchedChambre.hotel, id: e.target.value } })}
                                >
                                    <option>Sélectionnez un hotel</option>
                                    {hotels.map((hotel) => (
                                        <option key={hotel.id} value={hotel.id}>
                                            {hotel.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div></div>
                            <div>
                                <button className="btn btn-primary mx-2" type='submit'>Valider</button>
                                <button className="btn btn-danger mx-2" onClick={handleCancelMod}>Annuler</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div >
            <br />
            <hr />
            <br />
            {
                (nbChambres > 0) && (
                    <div>
                        <div className="flex items-center justify-center">
                            <h1 className="text-xl">Liste des chambres: {nbChambres}</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                            {chambres.map((chambre) => (
                                <div key={chambre.id} className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl">label:</p>
                                            <p>{chambre?.label}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl">dispo:</p>
                                            <p>
                                                {chambre?.dispo ? "true" : "false"}
                                            </p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl">Hotel:</p>
                                            <p>{chambre?.hotel?.nom}</p>
                                        </div>
                                        <div className="card-actions flex items-center justify-center">
                                            <button className="btn btn-secondary mx-2" onClick={() => handlePatch(chambre)}>Modifier</button>
                                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(chambre.id)}>Supprimer</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <br />
                    </div>
                )
            }
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
}