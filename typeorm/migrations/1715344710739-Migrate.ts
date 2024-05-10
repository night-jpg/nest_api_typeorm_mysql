const { MigrationInterface, QueryRunner, Table } = require("typeorm");

class Migrate1715344710739 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [{
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '63'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '127',
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '127'
                },
                {
                    name: 'birthDay',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'int',
                    default: '1',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                }
            ]
        }))
    }

    async down(queryRunner) {
        await queryRunner.dropTable('users')
    }
}

module.exports = Migrate1715344710739;