import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const API_URL = import.meta.env.VITE_BACKEND_END_ORIGIN;

  const testConnection = async () => {
    try {
      const response = await fetch(
        `${API_URL}/`
      );

      const data = await response.text();

      console.log(data);
      alert("Backend Connected ✅");
    } catch (error) {
      console.error(error);
      alert("Backend Not Connected ❌");
    }
  };

  return (
    <>
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <h1>Get started</h1>

        <button onClick={testConnection} className='testBtn'>
          Test Backend
        </button>
    </>
  )
}

export default App
