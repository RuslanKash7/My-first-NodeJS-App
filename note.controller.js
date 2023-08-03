const fs = require("fs/promises");

const path = require("path");

const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

console.log(notesPath);

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);

  console.log(chalk.bgGreen("Note was added"));
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(notes);
  console.log(chalk.bgGreen("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

async function removeNoteById(id) {
  const notes = await getNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  await saveNotes(filteredNotes);
  
  console.log(chalk.bgGreen(`Note with id="${id}" was removed`));
}

module.exports = {
  addNote,
  printNotes,
  removeNoteById,
};
