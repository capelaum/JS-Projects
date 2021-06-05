import { v4 as uuidv4 } from "uuid";
import moment from "moment";

let notes = [];

// Read existing notes from local storage
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    return [];
  }
};

const saveNotes = () => localStorage.setItem("notes", JSON.stringify(notes));

const getNotes = () => notes;

const createNote = () => {
  const noteId = uuidv4();
  const timestamp = new Date().getTime();
  console.log("🚀 ~ timestamp", timestamp);

  notes.push({
    id: `${noteId}`,
    title: `note-${notes.length}`,
    body: "This is my body",
    createdAt: timestamp,
    updatedAt: timestamp,
  });

  saveNotes();
};

notes = loadNotes();

export { getNotes, createNote };
