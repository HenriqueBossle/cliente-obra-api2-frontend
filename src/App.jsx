import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="container">

      <div className="overlay"></div>

      <div className="card">
        <h1>ClienteObra</h1>

        <p>
          Seu gerenciador de clientes e construções
        </p>

        <div className="buttons">

          <Link to="/login">
            <button className="login">
              Entrar
            </button>
          </Link>

          <Link to="/register">
            <button className="register">
              Criar conta
            </button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default App