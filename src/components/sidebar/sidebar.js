import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './sidebar.scss';
import pokemonImage from'../../assets/images/pokemon-logo.png';

export default function SideBar({pokemonList}) {

	const [pokemonFilterdList, setPokemonFilterdList] = useState(pokemonList);
	const [searchQuery, setSearchQuery] = useState('');

	function handleChange(e) {
		const query = e.target.value;
    setSearchQuery(query);
		const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
		setPokemonFilterdList(filteredList);
	}

	return (
		<div className="sidebar">
			<div className="sidebarHeader">
			<img src={pokemonImage} alt="Pokémon Logo" width='80' className="logo" />
			<input type="text" placeholder="Search Pokémon" className="search-bar" value={searchQuery}
          onChange={handleChange} />
			</div>
			<ul>
				{pokemonFilterdList.map((pokemon, index) => (
					<li key={index} className="list-item">
						<Link to={`/pokemon/${pokemon.name}`} className="list-link">{pokemon.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}