const mongoose = require("mongoose");

// Allows findOneAndUpdate to work
mongoose.set("useFindAndModify", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

mongoose
  .connect("mongodb://localhost/lab-mongoose-recipes", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose disconnected")
);

// COMMENT OUT ALL THE CODE BELOW TO TEST EVERY ITERATION ONE BY ONE:

// Iteration 2 - Create a recipe

const tortillaPapas = {
  title: "Tortilla de patatas",
  level: "Amateur Chef",
  cuisine: "Spanish",
  dishType: "main_course",
  duration: 40,
  creator: "Abel",
};

Recipe.create(tortillaPapas, (err, result) => {
  if (err) console.log(err);
  else console.log("Marchando tortilla papas:", result.title);
});

// // Iteration 3 - Insert multiple recipes

Recipe.insertMany(data, (err, result) => {
  if (err) console.log(err);
  else {
    result.forEach((e) => console.log("Recipes added:", e.title));
  }
});

// Iteration 4 - Update recipe

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } }
)
  .then((result) => {
    console.log("Duration updated successfully", result);
  })
  .catch((err) => console.log(err));

// Iteration 5 - Remove a recipe

Recipe.deleteOne({ title: "Carrot Cake" })
  .then((result) => console.log("Success deleting recipe"))
  .catch((err) => console.log(err));

// Iteration 6 - Close  the Database

const promise1 = Recipe.create(tortillaPapas)
const promise2 = Recipe.insertMany(data)
const promise3 = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration:  100 } })
const promise4 = Recipe.deleteOne({ title:'Carrot Cake'})

Promise.all([promise1, promise2, promise3, promise4])
  .then((result) => {
    console.log("ALL LAB ITERATIONS:", result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
