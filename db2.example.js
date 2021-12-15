import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

//vi laver et db pool, en "mass connection" med de indstillinger vi ville bruge under normale db opkoblings forhold.
const db = mysql
	.createPool({
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		waitForConnections: true,
		connectionLimit: 10,
	})

	// vi konverterer vores pool til et promise pool, hvilket vil sige hele vores pool bliver lavet om med promise struktur,
	//hvilket vil sige at et promise automatisk bliver oprettet når den bliver kaldt
	.promise();

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

class ExampleModel {
	constructor() {
		console.log("Class song model is loaded");
	}

	delete = async (req, res) => {
		//vi definerer et sql statement som altid når vi skal lave sql kald.
		const sql = `delete from song where id = ?`;

		//vi opretter en const til at indholde det data vi henter fra databasen, det der vil komme retur er [rows, fields] altså et array med 2 arrays,
		//det første array indeholder de data vi forsøger at hente ud, det andet array indeholder meta data.
		const [result, meta] = await db

			//i et pool environment bliver alle query connections automatisk lukket når vores sql statement er blevet resolved.
			//selvom det umiddelbart er det samme som vi plejer at bruge, er der en mindre forskel, når vi bruger den indbyggede
			//promise funktionalitet kan vi ikke lave callback funktioner fra vores query så vi sætter vores err i en catch og vores result til en const.
			.query(sql, [req.params.id])

			//fail safe error handler
			.catch(console.log);

		//return the result
		return result;
	};
}
