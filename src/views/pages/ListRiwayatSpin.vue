<template>
    <div>
        <div class="mb-4 flex justify-between items-center">
            <input v-model="searchHistory" @input="debouncedSearch" type="text" placeholder="Cari Riwayat..."
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
                        <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Unit</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                        <!-- <CTableHeaderCell scope="col">Action</CTableHeaderCell> -->
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(history, index) in histories" :key="history.id">
                        <CTableHeaderCell scope="row">{{ (page - 1) * 10 + index + 1 }}</CTableHeaderCell>
                        <CTableDataCell>{{ history.nipp }}</CTableDataCell>
                        <CTableDataCell>{{ history.pemenang }}</CTableDataCell>
                        <CTableDataCell>{{ history.unit }}</CTableDataCell>
                        <CTableDataCell>{{ history.nama_hadiah }}</CTableDataCell>
                        <!-- <CTableDataCell>
                            <div class="flex space-x-2">
                                <button @click="UpdateKandidat(kandidat.id)"
                                    class="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600">Update</button>
                                <button @click="Delete(kandidat.id)"
                                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Delete</button>
                            </div>
                        </CTableDataCell> -->
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
            searchHistory: "",
            histories: [],
            loading: false,
            page: 1, 
        };
    },
    methods: {
//         UpdateKandidat(id) {
//             this.$router.push({ name: 'UpdateKandidatUtama', params: { id: id } });
//             console.log("Updating kandidat with id:", id);
//         },

//         async Delete(id) {
//   const confirmDelete = window.confirm("Are you sure you want to delete this kandidat?");

//   if (confirmDelete) {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.delete(`http://127.0.0.1:8000/api/kandidat-hadiah-utama/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         this.kandidats = this.kandidats.filter(kandidat => kandidat.kandidat.id !== id);
//         alert("Kandidat deleted successfully.");
//         this.fetchKandidats();
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("An error occurred while deleting the kandidat.");
//     }
//   } else {
//     alert("Kandidat deletion cancelled.");
//   }
// },

        async fetchHistory() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in local storage.');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/riwayat/riwayat', {
                    params: {       
                        q: this.searchHistory,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.histories = response.data.data || []; 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.loading = false;
            }
        },

        debouncedSearch: debounce(function () {
            this.fetchHistory();
        }, 500),
    },
    watch: {
        page() {
            this.fetchHistory();
        },
    },
    mounted() {
        this.fetchHistory();
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
