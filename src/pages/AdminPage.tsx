import { useAuth } from "@/Context/AuthContext";
import { User } from "@/Interfaces/Auth"
import { deleteUser, getUsers, modifyUserRole } from "@/Services/UserService";
import { useEffect, useState } from "react"


const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();
  
  const loadUsers = async () => {
    if (user?.role == "Admin") {
      const accounts = await getUsers();
      setUsers(accounts);
    }
  }

  const editRole = async (userId: string, newRole: string) => {
    try {
      await modifyUserRole(userId, newRole);

      await loadUsers();
    } catch (error) {
      console.error(error);
    }
  }
  
  const delUser = async (userId: string) => {
    if (window.confirm("Är du säker att du vill ta bort detta användarkonto?")) {
      try {
        await deleteUser(userId);

        await loadUsers();
      } catch (error) {
        console.error(error);
      }
    }
  }


  useEffect(() => {
    loadUsers();
  }, [])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin dashboard</h1>
     {/*  Users info */}
      <div className="bg-white shadow rounded-lg">
        {users.map((userItem) => (
          <div key={userItem.id} className="p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-lg font-medium text-gray-800">{userItem.username}</p>
                <p className="text-gray-600">{userItem.email}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Nuvarande roll:</span> 
                  <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                    userItem.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {userItem.role}
                  </span>
                </p>
              </div>
              {/* Roles */}
              <div className="flex items-center space-x-3">
                <select 
                  value={userItem.role} 
                  onChange={(e) => editRole(userItem.id, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                {/* Delete user */}
                <button 
                  onClick={() => delUser(userItem.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Det finns inga användarkonton
        </div>
      )}
    </div>
  )
}

export default AdminPage