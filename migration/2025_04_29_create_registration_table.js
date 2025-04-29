export async function up(knex) {
    return knex.schema.createTable('registrationtable', (table) => {
        table.increments('id').primary();
        table.string('fname');
        table.string('lname');
        table.string('email').unique();
        table.string('password');
        table.string('role');
    });
}

export async function down(knex) {
    return knex.schema.dropTableIfExists('registrationtable');
}