<template>
  <div>
    <div class="mb-4 flex justify-between items-center">
      <button @click="$router.push({ name: 'AddEvent' })"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14M5 12h14" />
        </svg>
        Tambah Event
      </button>

      <input v-model="searchEvents" @input="debouncedSearch" type="text" placeholder="Cari Events..."
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
            <CTableHeaderCell scope="col">Nama Event</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tanggal Mulai</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tanggal Selesai</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow v-for="(item, index) in events" :key="item.event.id">
            <CTableHeaderCell scope="row">{{ (page - 1) * 10 + index + 1 }}</CTableHeaderCell>
            <CTableDataCell>{{ item.event.nama_event }}</CTableDataCell>
            <CTableDataCell>{{ item.event.tanggal_mulai }}</CTableDataCell>
            <CTableDataCell>{{ item.event.tanggal_selesai }}</CTableDataCell>
            <CTableDataCell>{{ item.status }}</CTableDataCell>
            <CTableDataCell>
              <div class="flex space-x-2">
                <button @click="UpdateEvent(item.event.id)"
                  class="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600">Update</button>
                <button @click="DeleteEvent(item.event.id)"
                  class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">Delete</button>
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
      searchEvents: "",
      events: [],
      loading: false,
      page: 1,
    };
  },
  methods: {
    async DeleteEvent(id) {
      // Menampilkan konfirmasi sebelum menghapus event
      const confirmDelete = window.confirm("Are you sure you want to delete this event?");

      // Jika pengguna memilih Yes (true)
      if (confirmDelete) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.delete(`http://127.0.0.1:8000/api/delete-event/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            // Menghapus event dari daftar jika berhasil
            this.events = this.events.filter(event => event.event.id !== id);
            alert("Event deleted successfully.");
            this.fetchEvents
          } else {
            alert("Failed to delete event.");
          }
        } catch (error) {
          console.error("Error deleting event:", error);
          alert("An error occurred while deleting the event.");
        }
      } else {
        // Jika pengguna memilih No (tidak melanjutkan penghapusan)
        alert("Event deletion cancelled.");
      }
    },


    UpdateEvent(id) {
      this.$router.push({ name: 'UpdateEvent', params: { id: id } });
      console.log("Updating event with id:", id);
    },

    async fetchEvents() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in local storage.');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/get-event', {
          params: {
            q: this.searchEvents,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.events = response.data.data || [];
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        this.loading = false;
      }
    },

    debouncedSearch: debounce(function () {
      this.fetchEvents();
    }, 500),
  },
  watch: {
    page() {
      this.fetchEvents();
    },
  },
  mounted() {
    this.fetchEvents();
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
