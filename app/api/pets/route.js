import { NextResponse } from 'next/server';
import pool from '/app/lib/db';

export async function GET() {
  try {
    // Connect to the database and fetch all pets
    const [rows] = await pool.query('SELECT * FROM pet');

    // Return the data as JSON
    return NextResponse.json(rows);
  } catch (error) {
    // Handle error and return a 500 status code if something goes wrong
    return NextResponse.json(
      { message: 'Error fetching pets', error: error.message },
      { status: 500 }
    );
  }
}
