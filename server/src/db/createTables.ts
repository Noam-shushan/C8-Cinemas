import { Knex } from "knex"


export default async function createTables(db: Knex) {
    await db.schema.hasTable('screeningRooms').then(exists => {
        if (!exists) {
            console.log('screeningRooms table created')
            return db.schema.createTable('screeningRooms', table => {
                table.increments('id').primary()
                table.boolean('isDeleted').notNullable().defaultTo(false)
                table.timestamps(true, true)
                table.string('name').notNullable()
            })
        }
    })

    await db.schema.hasTable('movies').then(exists => {
        if (!exists) {
            console.log('movies table created')
            return db.schema.createTable('movies', table => {
                table.increments('id').primary()
                table.boolean('isDeleted').notNullable().defaultTo(false)
                table.timestamps(true, true)
                table.string('title').notNullable()
                table.string('description').notNullable()
                table.integer('duration').notNullable()
                table.string('image').notNullable()
            })
        }
    })

    await db.schema.hasTable('screenings').then(exists => {
        if (!exists) {
            console.log('screenings table created')
            return db.schema.createTable('screenings', table => {
                table.increments('id').primary()
                table.boolean('isDeleted').notNullable().defaultTo(false)
                table.timestamps(true, true)
                table.integer('screeningRoomId').unsigned().notNullable()
                table.foreign('screeningRoomId').references('screeningRooms.id')
                table.integer('movieId').unsigned().notNullable()
                table.foreign('movieId').references('movies.id')
                table.dateTime('date').notNullable()
            })
        }
    })

    await db.schema.hasTable('seatBookings').then(exists => {
        if (!exists) {
            console.log('seatBookings table created')
            return db.schema.createTable('seatBookings', table => {
                table.increments('id').primary()
                table.boolean('isDeleted').notNullable().defaultTo(false)
                table.timestamps(true, true)
                table.integer('price').notNullable()
                table.integer('userId').unsigned().notNullable()
                //table.foreign('userId').references('users.id')
                table.integer('screeningId').unsigned().notNullable()
                table.foreign('screeningId').references('screenings.id')
                table.integer('seatInRoomId').unsigned().notNullable()
                table.foreign('seatInRoomId').references('seatsInRoom.id')
                table.enum('status', ['reserved', 'paid', 'cancelled']).notNullable()
            })
        }
    })

    await db.schema.hasTable('seatsInRoom').then(exists => {
        if (!exists) {
            console.log('seatsInRoom table created')
            return db.schema.createTable('seatsInRoom', table => {
                table.increments('id').primary()
                table.boolean('isDeleted').notNullable().defaultTo(false)
                table.timestamps(true, true)
                table.integer('screeningRoomId').unsigned().notNullable()
                table.foreign('screeningRoomId').references('screeningRooms.id')
                table.integer('seat').notNullable()
                table.integer('rowNumber').notNullable()
                table.unique(['screeningRoomId', 'seat', 'rowNumber'])
            })
        }
    })
}
