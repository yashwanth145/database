"use server"
import { connectDB } from "../lib/db"
export async function createuser(User, email) {
    try {
        const db = await connectDB();
        await db.execute("INSERT INTO userdatabase(User, Email) VALUES (?, ?)", [User, email]);
        db.end();
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

export async function deleteuser(name, email) {
    try {
        const db = await connectDB();
        await db.execute("DELETE FROM userdatabase WHERE User=?", [name]); // Using 'name' instead of 'User'
        db.end();
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

export async function getusers() {
    try {
        const db = await connectDB();
        const [rows] = await db.query("SELECT * FROM userdatabase"); // ✅ Use `query()` instead of `execute()`
        db.end();

        return rows.map(user => ({
            id: user.id,      // Ensure these match your table column names
            name: user.User,  
            email: user.Email 
        })); 
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function updateuser(User, Email) {
    try {
        const db = await connectDB();  // Ensure DB connection is awaited
        await db.execute("UPDATE userdatabase SET User=?, Email=? WHERE User=?", [User, Email, User]);
        db.end();
    } catch (error) {
        console.error("Error updating user:", error);
    }
}
