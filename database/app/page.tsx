"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import image from "./mybook.jpeg"
import { useState, useEffect } from "react";
import { createuser, getusers, deleteuser } from "./actions";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getusers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function handleAddUser() {
    await createuser(name, email);
    await fetchUsers(); // Refresh user list
  }

  async function handleDeleteUser(userName) {
    await deleteuser(userName);
    await fetchUsers(); // Refresh user list
  }

  return (
    <div>
      <h1>Users</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="User" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((user) => (
           <div className="flex space-x-4" style={{ width: "18rem" }}>
            <div></div>
            <Image src={image} alt="No book available"></Image>
           <div className="card-body">
             <h5 className="card-title">{user.name}</h5>
             <p className="card-text">{user.email}</p>
             <a href=" " className="btn btn-primary">
               Go somewhere
             </a>
           </div>
         </div>
        ))}
      </ul>
    </div>
  );
}
