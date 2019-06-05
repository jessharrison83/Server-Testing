exports.up = function(knex, Promise) {
  return knex.schema.createTable("pets", table => {
    table.increments();
    table.string("name").notNullable();
    table.string("type").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("pets");
};
