import mongoose from "mongoose";

const usersWordsSchema = new mongoose.Schema({
  usersword_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  word_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "words",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  context: { type: String, required: true, unique: true },
  creation_date: { type: Date, default: Date.now },
  date_1: { type: String },
  date_7: { type: String },
  date_30: { type: String },
});

// Pre-save hook to compute `date_1`, `date_7`, and `date_30`
usersWordsSchema.pre("save", function (next) {
  if (this.creation_date) {
    const creationDate = new Date(this.creation_date);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    this.date_1 = formatDate(
      new Date(creationDate.getTime() + 1 * 24 * 60 * 60 * 1000)
    );
    this.date_7 = formatDate(
      new Date(creationDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
    this.date_30 = formatDate(
      new Date(creationDate.getTime() + 30 * 24 * 60 * 60 * 1000)
    );
  }
  next();
});

const UsersWords = mongoose.model("UsersWords", usersWordsSchema);

export default UsersWords;
