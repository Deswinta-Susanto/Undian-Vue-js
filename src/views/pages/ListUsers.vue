<template>
    <div>
        <div class="mb-4 flex justify-between items-center">
            <button @click="$router.push({ name: 'AddUser' })"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14" />
                </svg>
                Tambah Pengguna
            </button>

            <input v-model="searchUsers" @input="debouncedSearch" type="text" placeholder="Cari Pengguna..."
                class="px-4 py-2 border rounded-lg" />
        </div>

        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">No</CTableHeaderCell>
                        <CTableHeaderCell scope="col">NIP</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Nama Lengkap</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(user, index) in users" :key="user.id">
                        <CTableHeaderCell scope="row">{{ (page - 1) * 10 + index + 1 }}</CTableHeaderCell>
                        <CTableDataCell>{{ user.niip }}</CTableDataCell>
                        <CTableDataCell>{{ user.nama }}</CTableDataCell>
                        <CTableDataCell>{{ user.role }}</CTableDataCell>
                        <CTableDataCell>{{ user.unit }}</CTableDataCell>
                        <CTableDataCell>
                            <div class="flex space-x-2">
                                <button @click="UpdateUser(user.id)"
                                    class="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600">Update</button>
                                <button @click="ResetPassword(user.id)"
                                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Reset Password</button>
                                    <button @click="DeleteUser(user.id)"
                                    class="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600">Delete</button>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
    data() {
        return {
            searchUsers: "",
            users: [],
            loading: false,
            page: 1, 
        };
    },
    methods: {
        UpdateUser(id) {
            this.$router.push({ name: 'UpdateUser', params: { id: id } });
            console.log("Updating user with id:", id);
        },
        
        ResetPassword(id) {
            this.$router.push({ name: 'ResetPassword', params: { id: id } });
            console.log("Reset Password user with id:", id);
        },

        async DeleteUser(id) {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) {
    alert("User deletion cancelled.");
    return;
  }
  
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token is missing. Please log in again.");
    return;
  }
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200 && response.data.message) {
        alert(response.data.message); // Tampilkan pesan dari backend
        await this.fetchUsers();
      } else {
      console.error("Unexpected response:", response.data);
      alert("Failed to delete the user.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("An error occurred while deleting the user.");
  }
},
        // Fetch users from the API
        async fetchUsers() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in local storage.');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/dataAdmin', {
                    params: {       
                        q: this.searchUsers,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.users = response.data.data || []; 
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                this.loading = false;
            }
        },

        debouncedSearch: debounce(function () {
            this.fetchUsers();
        }, 500),
    },
    watch: {
        page() {
            this.fetchUsers();
        },
    },
    mounted() {
        this.fetchUsers();
    },
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
