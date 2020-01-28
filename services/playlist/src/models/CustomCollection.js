import mongoose from "mongoose";

export default mongoose.model(
	"CustomCollection",
	new mongoose.Schema({
		name: String,
		songs: [
			{
				title: String,
				thumbnail: String,
				duration: String,
				videoId: String,
				channelName: String,
				channelId: String,
				uploadedOn: String,
				views: String,
				description: String,
			},
		],
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	}),
);