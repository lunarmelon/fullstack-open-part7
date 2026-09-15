import { useEffect, useState } from "react";
import anecdoteService from "../services/anecdotes";

export const useField = (type) => {
	const [value, setValue] = useState("");

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const onReset = () => {
		setValue("");
	};

	return {
		type,
		value,
		onChange,
		onReset,
	};
};

export const useAnecdotes = () => {
	const [anecdotes, setAnecdotes] = useState([]);

	useEffect(() => {
		anecdoteService.getAll().then((data) => setAnecdotes(data));
	}, []);

	const addAnecdote = async (anecdote) => {
		anecdoteService
			.createNew(anecdote)
			.then((data) => setAnecdotes(anecdotes.concat(data)));
	};

	return { anecdotes, addAnecdote };
};
