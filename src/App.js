import React, {useEffect, useState} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  //listar todos os repositórios
  useEffect(()=>{
    api.get('repositories').then(response=>{
      console.log(response)
      setRepositories(response.data);

    })
  },[])

  //adicionar repositório
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Be The hero',
      url: 'https://github.com/maykonsousa/bethehero',
      techs: ['Node, React, Reactnative']
    });

    setRepositories([...repositories, response.data])
  }
  // remover repositório
  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository=> repository.id !==id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>(
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
