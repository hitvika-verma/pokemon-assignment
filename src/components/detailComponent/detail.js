import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './detail.scss';

const PokemonDetail = ({ pokemonDetails, onFetchDetail }) => {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);

	useEffect(() => {
		const load = async () => {
			// Use cached data if available
			if (pokemonDetails[name]) {
				setPokemon(pokemonDetails[name]);
			} else {
				// Otherwise, fetch and cache
				await onFetchDetail(name);
			}
		};

		load();
	}, [name, pokemonDetails, onFetchDetail]);

	useEffect(() => {
		if (pokemonDetails[name]) {
			setPokemon(pokemonDetails[name]);
		}
	}, [pokemonDetails, name]);

	if (!pokemon) return <p>Loading...</p>;

	return (
		<>

			<Helmet>
				<title>{pokemon.name}</title>
				<meta name="description" content={`Details about ${pokemon.name}`} />
				<meta name="keywords" content={`${pokemon.name}, pokemon, details`} />
			</Helmet>

			<div className="pokemonDeatilContainer">
				<h1>{pokemon.name}</h1>
				<img src={pokemon.sprites.front_default} alt={pokemon.name} width='200' height='200' />
				<table className="pokemonDetailTable">
					<tr>
						<th><h3>Height</h3></th>
						<th><h3>Weight</h3></th>
						<th><h3>Abilities</h3></th>
						<th><h3>Types</h3></th>
					</tr>
					<tr>
						<td><h3>{pokemon.height}</h3></td>
						<td><h3>{pokemon.weight}</h3></td>
						<td>
							<ul>
								{pokemon.abilities.map((ability, index) => (
									<li key={index}>{ability.ability.name}</li>
								))}
							</ul>
						</td>
						<td>
							<ul>
								{pokemon.types.map((type, index) => (
									<li key={index}>{type.type.name}</li>
								))}
							</ul>
						</td>
					</tr>
				</table>
			</div>

		</>
	);
};

export default PokemonDetail;
