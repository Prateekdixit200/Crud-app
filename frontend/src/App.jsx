import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://127.0.0.1:8000'

function App() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'EMPLOYEE',
    manager_id: ''
  })
  const [message, setMessage] = useState('')

  const fetchUsers = async () => {
    const response = await axios.get(`${API}/users`)
    setUsers(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        ...form,
        manager_id: form.manager_id ? parseInt(form.manager_id) : null
      }
      await axios.post(`${API}/users`, data)
      setMessage('User created successfully!')
      setForm({ email: '', password: '', full_name: '', role: 'EMPLOYEE', manager_id: '' })
      fetchUsers()
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Error creating user')
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`${API}/users/${id}`)
    setMessage('User deleted successfully!')
    fetchUsers()
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Management System</h1>

      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={e => setForm({...form, full_name: e.target.value})}
          required
        /><br/><br/>
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({...form, email: e.target.value})}
          required
        /><br/><br/>
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
          required
        /><br/><br/>
        <select
          value={form.role}
          onChange={e => setForm({...form, role: e.target.value})}
        >
          <option value="EMPLOYEE">EMPLOYEE</option>
          <option value="MANAGER">MANAGER</option>
        </select><br/><br/>
        <input
          placeholder="Manager ID (optional)"
          value={form.manager_id}
          onChange={e => setForm({...form, manager_id: e.target.value})}
        /><br/><br/>
        <button type="submit">Create User</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      <h2>All Users</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Manager ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.manager_id ?? 'None'}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{ color: 'red' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App