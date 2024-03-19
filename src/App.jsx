import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './api';
import Summary from './component/Sumary';
import Carousel from './component/Carousel';
import { data } from 'autoprefixer';

function App() {
  const [pokeList, setPokeList] = useState([]);
  const [selectedPoke, setSelectedPoke] = useState({});
  const [page, setPage] = useState(0);
  const [imagenes, setImagenes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(`/pokemon?limit=6&offset=${page * 6}`);
      setPokeList(response.data.results);
    };
    fetchData();
  }, [page]);

  //Usar otro useEffect
  useEffect(() => {
    const mostrarImagenes = async () => {
      const imagenes = await 
        Promise.all(
        pokeList.map(async (pokemon) => {
          const response = await axiosInstance.get(pokemon.url);
          return response.data.sprites.front_default;
        })
      );
      setImagenes(imagenes);
      setPokeList(data.data.results)
      console.log(data)
    };
    mostrarImagenes();
  }, [pokeList]);

  const getInfo = async (url) => {
    const data = await axiosInstance.get(url);
    setSelectedPoke({ img: data.data.sprites.front_default, stats: data.data.stats });
    console.log(data)
  };

  const getPokemonList = () => {
    return pokeList.map((pokemon, main) => {
      return {
        name: pokemon.name,
        img: imagenes[main],
        url: '/whos.jpg',
        onClick: () => getInfo(pokemon.url)
      }
    });
  };

  const onNextPage = async () => {
    const nextPage = page + 1;
    const data = await axiosInstance.get(`/pokemon?limit=6&offset=${nextPage * 6}`);
    setPokeList(data.data.results);
    setPage(nextPage);
  };

  const onPrevPage = async () => {
    if (page > 0) {
      const prevPage = page - 1;
      const data = await axiosInstance.get(`/pokemon?limit=6&offset=${prevPage * 6}`);
      setPokeList(data.data.results);
      setPage(prevPage);
    }
  };

  return (
    <div className={`flex flex-col w-full h-screen items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
      <button className='ml-auto' onClick={() => setIsDarkMode(!isDarkMode)}>
        <img width="35px" height="35px" src={isDarkMode ? '/sun.svg' : '/moon.svg'} alt="Dark mode toggle" />
      </button>
      <h1 className={`mb-5 text-3xl font-bold uppercase ${isDarkMode ? 'text-white' : 'text-black'}`}>PokeDex</h1>
      <Carousel onLeftClick={onPrevPage} onRightClick={onNextPage} elementList={getPokemonList()} />
      <div>{Object.keys(selectedPoke).length > 0 && <Summary data={selectedPoke} />}</div>
    </div>
  );
}

export default App;
