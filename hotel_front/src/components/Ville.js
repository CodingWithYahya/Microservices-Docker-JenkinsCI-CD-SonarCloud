import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

export function Ville() {
  const [villes, setVilles] = useState([]);
  const [nbVilles, setNbVilles] = useState();
  const [newVille, setNewVille] = useState({ label: '' });
  const [patchedVille, setPatchedVille] = useState({ id: '', label: '' });

  const displayAll = () => {
    fetch('SERVICE-CHAMBRE/api/ville/findAll')
      .then(response => response.json())
      .then(data => setVilles(data))
      .catch(error => console.log(error));
  };

  const countVilles = () => {
    fetch('SERVICE-CHAMBRE/api/ville/count')
      .then(response => response.json())
      .then(data => setNbVilles(data))
      .catch(error => console.log(error));
  };

  const addNewVille = () => {
    fetch('SERVICE-CHAMBRE/api/ville/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ label: newVille.label })
    })
      .then((response) => {
        if (response.ok) {
          console.log("ville added successfully");
          toast.success('Succès');
          countVilles();
          displayAll();
        }
      })
      .catch(error => console.log(error));
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    addNewVille();
    setNewVille({ label: '' });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCancelAdd = (e) => {
    setNewVille({ label: '' });
    e.preventDefault();
  }
  const handleCancelMod = (e) => {
    setPatchedVille({ id: '', label: '' });
    e.preventDefault();
  }

  const handlePatch = (ville) => {
    setPatchedVille({ ...ville });
    handleScrollToTop();
  };

  const handleSubmitPatch = (e) => {
    e.preventDefault();
    patchVille();
    setPatchedVille({ id: '', label: '' })
  };

  const deleteVille = (id) => {
    fetch(`SERVICE-CHAMBRE/api/ville/delete/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          console.log('Ville deleted successfully');
          toast.success('Succès');
          countVilles();
          displayAll();
        }
        else
          toast.error('Echec, cet attribut ne peut pas être supprimé maintenant!');
      })
      .catch(error => {
        console.error('Error deleting ville:', error);
      });
  };

  const handleDelete = (id) => {
    deleteVille(id);
    setPatchedVille({ id: '', label: '' })
  };
  const patchVille = () => {
    fetch('SERVICE-CHAMBRE/api/ville/put', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: patchedVille.id, label: patchedVille.label })
    })
      .then((response) => {
        if (response.ok) {
          console.log("ville patched successfully");
          toast.success('Succès');
          countVilles();
          displayAll();
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    countVilles();
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
              <h3 className='mx-2'>Ville</h3>
              <input
                type='text'
                className="input input-bordered input-primary w-full max-w-xs"
                placeholder='label'
                required={true}
                value={newVille.label}
                onChange={(e) => setNewVille({ ...newVille, label: e.target.value })}
              />
              <br></br>
              <br></br>
              <div>
                <button className="btn btn-primary mx-2" type='submit'>Valider</button>
                <button className="btn btn-danger mx-2" onClick={handleCancelAdd}>Annuler</button>
              </div>
            </fieldset>
          </form>
          <form className='' onSubmit={handleSubmitPatch}>
            <fieldset className="border p-2">
              <legend className="float-none w-auto p-2">Modifier</legend>
              <h3 className='mx-2'>Ville</h3>
              <input
                type='text'
                className="input input-bordered input-primary w-full max-w-xs"
                placeholder='label'
                required={true}
                value={patchedVille.label}
                onChange={(e) => setPatchedVille({ ...patchedVille, label: e.target.value })}
              >
              </input>
              <br></br>
              <br></br>
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
      {(nbVilles > 0) && (
        <div>
          <div className="flex items-center justify-center">
            <h1 className="text-xl">Liste des villes: {nbVilles}</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto">
            {villes.map((ville) => (
              <div key={ville.id} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="mb-2">
                    <p className="text-blue-600/100 w-32 text-xl">Nom:</p>
                    <p>{ville?.label}</p>
                  </div>
                  <div className="card-actions flex items-center justify-center">
                    <button className="btn btn-secondary mx-2" onClick={() => handlePatch(ville)}>Modifier</button>
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(ville.id)}>Supprimer</button>
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