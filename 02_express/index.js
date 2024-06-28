import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Create Opertation
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get all Opertation
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// Get by ID Opertation
app.get("/tea/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === Number(req.params.id));
  if (!tea) {
    res.status(404).send("Tea Not Found!");
  }
  res.status(200).send(tea);
});

// Update Opertation
app.put("/tea/:id", (req, res) => {
  const tea = teaData.find((tea) => tea.id === Number(req.params.id));
  if (!tea) {
    res.status(404).send("Tea Not Found!");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

// delete Opertation
app.delete("/tea/:id", (req, res) => {
  const index = teaData.findIndex((tea) => tea.id === Number(req.params.id));
  if (index == -1) {
    res.status(404).send("Tea not Found!");
  }
  teaData.splice(index, 1);
  res.status(204).send("Tea Deleted");
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
