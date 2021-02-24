
exports.up = function(knex) {
  return knex.schema.createTable("palettes", function(table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("color0", 255).notNullable();
    table.string("color1", 255).notNullable();
    table.string("color2", 255).notNullable();
    table.string("color3", 255).notNullable();
    table.string("color4", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("palettes");
};
