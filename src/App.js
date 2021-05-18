import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';


import Header from './components/Header';

/**
 * Componente
 * Propriedade 
 * Estado e Imutabilidade
 */


function App() {
    const [projects, setProjects] = useState([]);                     
    
    //use state retorna um array com 2 posições.
    //1º. Variavel com o valor inicial
    //2º. É uma função para atualizar esse valor.

    useEffect(() => {
        api.get('projects').then(response =>{
            setProjects(response.data);
        })
    }, []);
    
    async function handleAddProject(){
        // setProjects([...projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Alessandro Barros"
        });

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>           
            <Header title='Projects'/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li> )}
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar Projeto</button>
        </>
    );
};

export default App;