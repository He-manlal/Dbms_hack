import pool from '/app/lib/db'; // Assumes you have a configured pool in lib/db.js with mysql2/promise
import { NextResponse } from 'next/server';

export async function PUT(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { pet_id, health_condition } = body;

    if (!pet_id || !health_condition) {
      return NextResponse.json({ error: 'Pet ID and health condition are required' }, { status: 400 });
    }

    // Execute the update query
    const [result] = await pool.execute(
      'UPDATE pet SET health_condition = ?, last_health_check = CURRENT_TIMESTAMP WHERE pet_id = ?',
      [health_condition, pet_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Pet not found or no changes made' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Health condition updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating health condition:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
