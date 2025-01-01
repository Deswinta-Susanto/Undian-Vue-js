<template>
    <div>
        <div class="mb-4 flex justify-between items-center">
        <!-- Flex container for buttons -->
        <div class="flex space-x-4">
            <!-- Add Doorprize Button -->
            <button @click="$router.push({ name: 'AddKandidatUmum' })"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14" />
                </svg>
                Tambah Kandidat
            </button>

            <!-- Import Data Button -->
            <button @click="openImportModal"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14" />
                </svg>
                Import Data
            </button>

                <!-- Export Kandidat Button -->
    <button @click="exportKandidat"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 7h6m0 0v6m0-6L10 21l-6-6" />
        </svg>
        Export Kandidat
    </button>
        </div>

            <input v-model="searchKandidat" @input="debouncedSearch" type="text" placeholder="Cari Kandidat..."
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
                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    <CTableRow v-for="(kandidat, index) in kandidats" :key="kandidat.id">
                        <CTableHeaderCell scope="row">{{ (page - 1) * 10 + index + 1 }}</CTableHeaderCell>
                        <CTableDataCell>{{ kandidat.nipp }}</CTableDataCell>
                        <CTableDataCell>{{ kandidat.nama }}</CTableDataCell>
                        <CTableDataCell>{{ kandidat.unit }}</CTableDataCell>
                        <CTableDataCell>{{ kandidat.status }}</CTableDataCell>
                        <CTableDataCell>
                            <div class="flex space-x-2">
                                <button @click="UpdateKandidat(kandidat.id)"
                                    class="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600">Update</button>
                                <button @click="Delete(kandidat.id)"
                                    class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Delete</button>
                            </div>
                        </CTableDataCell>
                    </CTableRow>
                </CTableBody>
            </CTable>
        </div>
        <div v-if="showImportModal" class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div class="bg-black p-6 rounded-lg w-96">
                <h3 class="text-lg font-semibold mb-4 text-white">Import Data Kandidat Format Excel</h3>

                <!-- Download Link for Template -->
                <a href="https://docs.google.com/spreadsheets/d/12XqgstXdvHmzsxOqJLdHHTEIPRVagvE7TwzlYbllWq8/export?format=xlsx" 
                   target="_blank"
                   class="text-blue-500 mb-4 inline-block">
                    Klik Download Format Excel
                </a>
                
                <!-- File Input for Upload -->
                <input type="file" @change="handleFileUpload" accept=".xls, .xlsx" class="mb-4 px-4 py-2 border rounded-lg w-full" />
            
                <!-- Buttons -->
                <div class="flex justify-end space-x-2">
                    <button @click="closeImportModal" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Cancel</button>
                    <button @click="submitImport" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Import</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
    data() {
        return {
            searchKandidat: "",
            kandidats: [],
            loading: false,
            page: 1, 
            showImportModal: false,
            fileToUpload: null
        };
    },
    methods: {

        async exportKandidat() {
        this.loading = true; // Menunjukkan proses sedang berjalan
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage.');
                this.loading = false;
                return;
            }

            const response = await fetch("http://127.0.0.1:8000/api/kandidat-hadiah-umum/export-kandidat", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                console.error('Failed to export kandidat:', response.statusText);
                this.loading = false;
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'kandidat-hadiah-umum.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            console.log('Export kandidat berhasil.');
        } catch (error) {
            console.error('Error while exporting kandidat:', error);
        } finally {
            this.loading = false;
        }
},

        openImportModal() {
        this.showImportModal = true;
    },

    // Closes the modal
    closeImportModal() {
        this.showImportModal = false;
    },

    // Handles file upload selection
    handleFileUpload(event) {
        this.fileToUpload = event.target.files[0];
    },

    async submitImport() {
    if (!this.fileToUpload) {
        alert("Please select a file to import.");
        return;
    }

    const formData = new FormData();
    formData.append("file", this.fileToUpload);

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
    }

    try {
        this.loading = true;

        const response = await axios.post("http://127.0.0.1:8000/api/kandidat-hadiah-umum/import-excel", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response);  // Log the response object

        this.loading = false;
        this.showImportModal = false;

        // Make sure response.data is available
        if (response.data && response.data.message) {
            alert(response.data.message);  // Show success message
        } else {
            alert("Import successful, but no message returned.");
        }

        // Optionally, refresh the data after import
        this.fetchKandidats();
    } catch (error) {
        this.loading = false;

        // Log the error for better debugging
        console.error(error);

        if (error.response && error.response.data) {
            alert("Error importing data: " + error.response.data.message);
        } else {
            alert("An error occurred during the import process. Please try again.");
        }
    }
},
        UpdateKandidat(id) {
            this.$router.push({ name: 'UpdateKandidatUmum', params: { id: id } });
            console.log("Updating kandidat with id:", id);
        },

        async Delete(id) {
  const confirmDelete = window.confirm("Are you sure you want to delete this kandidat?");
  if (!confirmDelete) {
    alert("Kandidat deletion cancelled.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Token is missing. Please log in again.");
    return;
  }

  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/kandidat-hadiah-umum/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    // Sesuaikan logika validasi respons
    if (response.status === 200 && response.data.message) {
      alert(response.data.message); // Tampilkan pesan dari backend
      await this.fetchKandidats(); // Perbarui data
    } else {
      console.error("Unexpected response:", response.data);
      alert("Failed to delete the kandidat.");
    }
  } catch (error) {
    console.error("Error deleting kandidat:", error);
    alert("An error occurred while deleting the kandidat.");
  }
},

        // Fetch users from the API
        async fetchKandidats() {
            this.loading = true;
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in local storage.');
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/api/kandidat-hadiah-umum/get', {
                    params: {       
                        q: this.searchKandidat,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                this.kandidats = response.data.data || []; 
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                this.loading = false;
            }
        },

        debouncedSearch: debounce(function () {
            this.fetchKandidats();
        }, 500),
    },
    watch: {
        page() {
            this.fetchKandidats();
        },
    },
    mounted() {
        this.fetchKandidats();
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
