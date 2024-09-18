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
  date_1: { type: Date },
  date_7: { type: Date },
  date_30: { type: Date },
});

// Pre-save hook to compute `date_1`, `date_7`, and `date_30` because can't use `this.`in schema (refers to schema context intsead of document context)
usersWordsSchema.pre("save", function (next) {
  if (this.creation_date) {
    this.date_1 = new Date(this.creation_date.getTime() + 24 * 60 * 60 * 1000);
    this.date_7 = new Date(
      this.creation_date.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    this.date_30 = new Date(
      this.creation_date.getTime() + 30 * 24 * 60 * 60 * 1000
    );
  }
  next();
});

const UsersWords = mongoose.model("UsersWords", usersWordsSchema);

export default UsersWords;
