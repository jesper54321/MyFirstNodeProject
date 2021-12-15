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
	.promise(); // vi konverterer vores pool til et promise pool, hvilket vil sige hele vores pool bliver lavet om med promise struktur,
//hvilket vil sige at et promise automatisk bliver oprettet når den bliver kaldt

export default db;
