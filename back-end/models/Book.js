const mongoose = require("mongoose");

var lessonSchema = new mongoose.Schema({
    lesson_number:  {
        type: Number,
        required: true
    },
    lesson_title:  {
        type: String,
        required: true
    },
    lesson_body:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const BookSchema = new mongoose.Schema(
  {
    book_title: {
      type: String,
      required: true,
      unique: true,
    },
    book_desc: {
      type: String,
      required: true,
    },
    book_photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    lessons:[lessonSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);