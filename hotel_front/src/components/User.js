import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export function User() {
    const [users, setUsers] = useState([]);
    const [nbUsers, setNbUsers] = useState();
    const [newUser, setNewUser] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: ''
    });
    const [patchedUser, setPatchedUser] = useState({
        id: '',
        nom: '',
        prenom: '',
        email: '',
        password: ''
    });

    const displayAll = () => {
        fetch('SERVICE-USER/api/user/findAll')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.log(error));
    };

    const countUsers = () => {
        fetch('SERVICE-USER/api/user/count')
            .then(response => response.json())
            .then(data => setNbUsers(data))
            .catch(error => console.log(error));
    };

    const addNewUser = () => {
        fetch('SERVICE-USER/api/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: newUser.nom,
                prenom: newUser.prenom,
                email: newUser.email,
                password: newUser.password
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("user added successfully");
                    toast.success('Succès');
                    countUsers();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        addNewUser();
        setNewUser({
            nom: '',
            prenom: '',
            email: '',
            password: ''
        });
    };

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleCancelAdd = (e) => {
        setNewUser({
            nom: '',
            prenom: '',
            email: '',
            password: ''
        });
        e.preventDefault();
    }
    const handleCancelMod = (e) => {
        setPatchedUser({
            id: '',
            nom: '',
            prenom: '',
            email: '',
            password: ''
        });
        e.preventDefault();
    }

    const handlePatch = (user) => {
        setPatchedUser({ ...user });
        handleScrollToTop();
    };

    const handleSubmitPatch = (e) => {
        e.preventDefault();
        patchUser();
        setPatchedUser({
            id: '',
            nom: '',
            prenom: '',
            email: '',
            password: ''
        })
    };

    const deleteUser = (id) => {
        fetch(`SERVICE-USER/api/user/delete/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (response.ok) {
                    console.log('User deleted successfully');
                    toast.success('Succès');
                    countUsers();
                    displayAll();
                }
                else
                    toast.error('Echec, cet attribut ne peut pas être supprimé maintenant!');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const handleDelete = (id) => {
        deleteUser(id);
        setPatchedUser({
            id: '',
            nom: '',
            prenom: '',
            email: '',
            password: ''
        })
    };
    const patchUser = () => {
        fetch('SERVICE-USER/api/user/put', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: patchedUser.id,
                nom: patchedUser.nom,
                prenom: patchedUser.prenom,
                email: patchedUser.email,
                password: patchedUser.password,

            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log("user patched successfully");
                    toast.success('Succès');
                    countUsers();
                    displayAll();
                }
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        countUsers();
        displayAll();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                    <form className="" onSubmit={handleSubmitAdd}>
                        <fieldset className="border p-2">
                            <legend className="float-none w-auto p-2">Ajouter</legend>
                            <h3 className='mx-2'>User</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='nom'
                                    required={true}
                                    value={newUser.nom}
                                    onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='prenom'
                                    required={true}
                                    value={newUser.prenom}
                                    onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='email'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='email'
                                    required={true}
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='password'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='password'
                                    required={true}
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                />
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
                            <h3 className='mx-2'>User</h3>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='nom'
                                    required={true}
                                    value={patchedUser.nom}
                                    onChange={(e) => setPatchedUser({ ...patchedUser, nom: e.target.value })}
                                >
                                </input>
                            </div>
                            <div className="mb-3">
                                <input
                                    type='text'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='prenom'
                                    required={true}
                                    value={patchedUser.prenom}
                                    onChange={(e) => setPatchedUser({ ...patchedUser, prenom: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='email'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='email'
                                    required={true}
                                    value={patchedUser.email}
                                    onChange={(e) => setPatchedUser({ ...patchedUser, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type='password'
                                    className="input input-bordered input-primary w-full max-w-xs"
                                    placeholder='password'
                                    required={true}
                                    value={patchedUser.password}
                                    onChange={(e) => setPatchedUser({ ...patchedUser, password: e.target.value })}
                                />
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
            {(nbUsers > 0) && (
                <div>
                    <div className="flex items-center justify-center">
                        <h1 className="text-xl">Liste des utilisateurs: {nbUsers}</h1>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
                        {users.map((user) => (
                            <div key={user.id} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Nom:</p>
                                        <p>{user?.nom}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Prenom:</p>
                                        <p>{user?.prenom}</p>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-blue-600/100 w-32 text-xl">Email:</p>
                                        <p>{user?.email}</p>
                                    </div>
                                    <div className="card-actions flex items-center justify-center">
                                        <button className="btn btn-secondary mx-2" onClick={() => handlePatch(user)}>Modifier</button>
                                        <button className="btn btn-danger mx-2" onClick={() => handleDelete(user.id)}>Supprimer</button>
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