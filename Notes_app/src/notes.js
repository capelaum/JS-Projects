import { v4 as uuidv4 } from "uuid";
import moment from "moment";

let notes = [];
notes = loadNotes();

// Read existing notes from local storage
function loadNotes() {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (error) {
    return [];
  }
}

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

const removeNote = id => {
  if (confirm("Are You sure?")) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      saveNotes();
    }
  }
};

const sortNotes = sortBy => {
  switch (sortBy) {
    case "byEdited":
      return notes.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) return -1;
        if (a.updatedAt < b.updatedAt) return 1;
        if (a.updatedAt === b.updatedAt) return 0;
      });
    case "byCreated":
      return notes.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt === b.createdAt) return 0;
      });
    case "alphabetical":
      return notes.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        if (a.title.toLowerCase() === b.title.toLowerCase()) return 0;
      });
    default:
      return notes;
  }
};

const updateNote = (id, updates) => {
  const noteToUpdate = notes.find(note => note.id === id);
  if (!noteToUpdate) return;

  if (typeof updates.title === "string") {
    noteToUpdate.title = updates.title;
    noteToUpdate.updatedAt = new Date().getTime();
  }

  if (typeof updates.body === "string") {
    noteToUpdate.body = updates.body;
    noteToUpdate.updatedAt = new Date().getTime();
  }

  saveNotes();
};

export { getNotes, createNote, removeNote, sortNotes, updateNote };
