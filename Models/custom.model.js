import { DataTypes, Model } from "sequelize";
import sequelize from "../Config/db.config.sql.js";
class ArtistModel extends Model {}
class SongModel extends Model {}

ArtistModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			references: {
				model: "SongModel",
				key: "artist_id",
			},
		},
		name: {
			type: DataTypes.CHAR,
			allowNull: false,
		},
	},

	{
		sequelize,
		modelName: "ArtistModel",
		tableName: "artist2",
		createdAt: "created",
		updatedAt: false,
	}
);

SongModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.CHAR,
			defaultValue: "ikke navngivet",
			allowNull: false,
		},
		artist_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "ArtistModel",
				key: "id",
			},
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "SongModel",
		tableName: "song2",
		createdAt: "created",
		updatedAt: false,
	}
);

SongModel.belongsTo(ArtistModel, { foreignKey: "artist_id" });
ArtistModel.hasMany(SongModel, { foreignKey: "artist_id" });

export { ArtistModel, SongModel };
