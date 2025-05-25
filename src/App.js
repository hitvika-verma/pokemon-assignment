import './App.scss';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Sidebar from './components/sidebar/sidebar';
import PokemonDetail from './components/detailComponent/detail'

function App() {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [pokemonDetails, setPokemonDetails] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0')
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const responsePokemon = await response.json();
				setData(responsePokemon.results);
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [])

	const getPokemonDetail = async (name) => {
		if (!pokemonDetails[name]) {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const data = await res.json();
			setPokemonDetails(prev => ({ ...prev, [name]: data }));
		}
	}

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<HelmetProvider>
			<Router>
				<div className="App">
					<Sidebar pokemonList={data} onFetchDetail={getPokemonDetail} />
					<Routes>
						<Route path="/" pokemonList={data} onFetchDetail={getPokemonDetail} />
						<Route
							path="/pokemon/:name"
							element={
								<PokemonDetail
									pokemonDetails={pokemonDetails}
									onFetchDetail={getPokemonDetail}
								/>
							}
						/>
					</Routes>
				</div>
			</Router>
		</HelmetProvider>
	);
}

export default App;
