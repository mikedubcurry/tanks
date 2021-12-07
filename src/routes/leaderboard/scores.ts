import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ body }) => {
	console.log(process.env.highscoreServer);
};

export const get: RequestHandler = async ({ path }) => {
	console.log(path);
	console.log(process.env.highscoreServer);
	const response = await fetch(`http://${process.env.highscoreServer}/highscores`);
	const scores = await response.json();
	console.log(scores);

	return {
		body: scores
	};
};
