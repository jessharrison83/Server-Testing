exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pets")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("pets").insert([
        {
          name: "Nova",
          type: "dog"
        },
        {
          name: "Reginald",
          type: "alpaca"
        },
        {
          name: "Pancake",
          type: "cat"
        },
        {
          name: "Angus",
          type: "dog"
        }
      ]);
    });
};
