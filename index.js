const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// connection to database
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGOOSE_URI);
  console.log("connected to mongoDB");
}
//contact schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [{ type: String }],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let janeFonda = new Person({
    name: "Jane Fonda",
    age: 81,
    favoriteFoods: ["eggs", "fugu"],
  });
  janeFonda.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["deep-dish pizza"] },
  { name: "Solana", age: 38, favoriteFoods: ["chicken parmesan"] },
  { name: "Persephone", age: 47, favoriteFoods: ["sushi"] },
];

const createManyPeople = (done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => {
    if (err) return done(err);
    done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  Person.remove({ name: "Mary" }, (err, response) => {
    if (err) return done(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};
