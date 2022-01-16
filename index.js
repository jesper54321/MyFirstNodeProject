import express from "express";
import dotenv from "dotenv";
import { router as SongRouter } from "./Routes/song.router.js";
import { router as ArtistRouter } from "./Routes/artist.router.js";
import { router as CustomRouter } from "./Routes/custom.router.js";

// Kalder environment vars
dotenv.config();

const port = process.env.PORT || 3030;

const app = new express();
app.use(
	express.urlencoded({
		extended: true,
	}),
	express.json(),
	function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader("Access-Control-Allow-Origin", "*");

		// Request methods you wish to allow
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);

		// Request headers you wish to allow
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-Requested-With,content-type"
		);

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader("Access-Control-Allow-Credentials", true);

		// Pass to next layer of middleware
		next();
	}
);

app.use(SongRouter);
app.use(ArtistRouter);
app.use(CustomRouter);

app.listen(port, () => {
	console.log(`Server kører på port http://localhost:${port}`);
});
