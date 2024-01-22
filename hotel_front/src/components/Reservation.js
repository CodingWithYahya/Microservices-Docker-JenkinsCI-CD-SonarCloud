import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { format } from 'date-fns';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [nbReservations, setNbReservations] = useState();
    const [chambres, setChambres] = useState([]);
    const [users, setUsers] = useState([]);

    const [newReservation, setNewReservation] = useState({
        dateReservation: '',
        userId: '',
        chambreId: '',
    }
    );
    const [patchedReservation, setPatchedReservation] = useState({
        id: '',
        dateReservation: '',
        userId: '',
        chambreId: ''
    });

    const displayAll = () => {
        fetch('SERVICE-RESERVATION/api/reservation/findAll')
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.log(error));
    };

    const countReservations = () => {
        fetch('SERVICE-RESERVATION/api/reservation/count')
            .then(response => response.json())
            .then(data => setNbReservations(data))
            .catch(error => console.log(error));
    };

    const findChambres = () => {
        fetch('SERVICE-CHAMBRE/api/chambre/findAll')
            .then(response => response.json())
            .then(data => setChambres(data))
            .catch(error => console.log(error));
    };

    const findUsers = () => {
        fetch('SERVICE-USER/api/user/findAll')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    };

    const addNewReservation = () => {
        fetch('SERVICE-RESERVATION/api/reservation/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dateReservation: newReservation.dateReservation,
                userId: newReservation.userId,
                chambreId: newReservation.chambreId
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("reservation added successfully");
                    toast.success('Succès');
                    countReservations();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        addNewReservation();
        setNewReservation({
            dateReservation: '',
            userId: '',
            chambreId: ''
        });
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleCancelAdd = (e) => {
        setNewReservation({
            dateReservation: '',
            userId: '',
            chambreId: ''
        });
        e.preventDefault();
    }
    const handleCancelMod = (e) => {
        setPatchedReservation({
            id: '',
            dateReservation: '',
            userId: '',
            chambreId: ''
        });
        e.preventDefault();
    }

    const handlePatch = (reservation) => {
        setPatchedReservation({ ...reservation });
        handleScrollToTop();
    };

    const handleSubmitPatch = (e) => {
        e.preventDefault();
        patchReservation();
        setPatchedReservation({
            id: '',
            dateReservation: '',
            userId: '',
            chambreId: ''
        })
    };

    const deleteReservation = (id) => {
        fetch(`SERVICE-RESERVATION/api/reservation/delete/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Reservation deleted successfully');
                    toast.success('Succès');
                    countReservations();
                    displayAll();
                }
                else
                    toast.error('Echec, cet attribut ne peut pas être supprimé maintenant!');
            })
            .catch(error => {
                console.error('Error deleting reservation:', error);
            });
    };

    const handleDelete = (id) => {
        deleteReservation(id);
        setPatchedReservation({
            id: '',
            dateReservation: '',
            userId: '',
            chambreId: ''
        })
    };
    const patchReservation = () => {
        fetch('SERVICE-RESERVATION/api/reservation/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: patchedReservation.id,
                dateReservation: patchedReservation.dateReservation,
                userId: patchedReservation.userId,
                chambreId: patchedReservation.chambreId
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("reservation patched successfully");
                    toast.success('Succès');
                    countReservations();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    function formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        countReservations();
        displayAll();
        findChambres();
        findUsers();
    }, []);

    return (
        <>
        <Navbar></Navbar>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                    <form className="" onSubmit={handleSubmitAdd}>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2">Ajouter</legend>
                            <h3 className='mx-2'>Reservation</h3>
                            <div className="mb-3">
                                <input
                                    type='Date'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={false}
                                    value={formatDateForInput(newReservation.dateReservation)}
                                    onChange={(e) => setNewReservation({
                                        ...newReservation,
                                        dateReservation: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={newReservation.chambreId}
                                    onChange={(e) => setNewReservation({ ...newReservation, chambreId: e.target.value })}
                                >
                                    <option>Sélectionnez une chambre</option>
                                    {chambres.map((chambre) => (
                                        <option key={chambre.id} value={chambre.id}>
                                            {chambre.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={newReservation.userId}
                                    onChange={(e) => setNewReservation({ ...newReservation, userId: e.target.value })}
                                >
                                    <option>Sélectionnez un utilisateur</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.nom}, {user.prenom}
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
                            <h3 className='mx-2'>Reservation</h3>
                            <div className="mb-3">
                                <input
                                    type='Date'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={false}
                                    value={formatDateForInput(patchedReservation.dateReservation)}
                                    onChange={(e) => setPatchedReservation({
                                        ...patchedReservation,
                                        dateReservation: e.target.value
                                    })} />
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={patchedReservation.chambreId}
                                    onChange={(e) => setPatchedReservation({ ...patchedReservation, chambreId: e.target.value })}
                                >
                                    <option>Sélectionnez une chambre</option>
                                    {chambres.map((chambre) => (
                                        <option key={chambre.id} value={chambre.id}>
                                            {chambre.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    required={true}
                                    value={patchedReservation.userId}
                                    onChange={(e) => setPatchedReservation({ ...patchedReservation, userId: e.target.value })}
                                >
                                    <option>Sélectionnez un utilisateur</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.nom}, {user.prenom}
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
                (nbReservations > 0) && (
                    <div>
                        <div className="flex items-center justify-center">
                            <h1 className="text-xl">Liste des reservations: {nbReservations}</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                            {reservations.map((reservation) => (
                                <div key={reservation.id} className="card bg-base-100 shadow-xl">
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl w-full">Date de résérvation:</p>
                                            <p>{format(new Date(reservation?.dateReservation), 'yyyy-MM-dd')}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl">Chambre:</p>
                                            <p>{reservation?.chambre?.label}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-blue-600/100 w-32 text-xl">Utilisateur:</p>
                                            <p>{reservation?.user?.nom}, {reservation?.user?.prenom}</p>
                                        </div>
                                        <div className="card-actions flex items-center justify-center">
                                            <button className="btn btn-secondary mx-2" onClick={() => handlePatch(reservation)}>Modifier</button>
                                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(reservation.id)}>Supprimer</button>
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