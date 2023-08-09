const express = require("express");
const chalk = require("chalk");
const { addNote, getNotes, removeNoteById, updateNote } = require("./note.controller");
const path = require("path");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());

app.get("/", async (req, res) => {
  // res.sendFile(path.join(basePath, "index.html"));
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  console.log("id", req.params.id);
  await removeNoteById(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  await updateNote({ id: req.params.id, title: req.body.title })
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
