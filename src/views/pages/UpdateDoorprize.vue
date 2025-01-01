<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Update Hadiah</strong>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="submitForm">
              <div class="mb-3">
                <CFormLabel for="nama_hadiah">Nama Hadiah</CFormLabel>
                <CFormInput id="nama_hadiah" v-model="nama_hadiah" type="text" placeholder="Masukkan nama hadiah" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="kategori">Kategori</CFormLabel>
                <CFormSelect id="kategori" v-model="kategori" required>
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="Umum">Umum</option>
                  <option value="Utama">Utama</option>
                  <option value="Lainnya">Lainnya</option>
                </CFormSelect>
              </div>
              <div class="mb-3">
                <CFormLabel for="sponsor">Sponsor</CFormLabel>
                <CFormInput id="sponsor" v-model="sponsor" type="text" placeholder="Masukkan sponsor" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="gambar">Gambar</CFormLabel>
                <CFormInput id="gambar" v-model="gambar" type="text" placeholder="Masukkan link gambar dengan type .jpg, .png, .jpeg" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="jumlah_awal">Jumlah Awal</CFormLabel>
                <CFormInput id="jumlah_awal" v-model="jumlah_awal" type="number" placeholder="Masukkan jumlah awal" required />
              </div>
              <div class="flex justify-end mt-4">
                <button type="submit" class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                  Submit
                </button>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        id: this.$route.params.id,
        nama_hadiah: "",
        kategori: "",  // Make sure this is an empty string initially
        sponsor: "",
        gambar: "",
        jumlah_awal: "",
      };
    },
    created() {
      this.fetchDoorprizeData(this.id);  // Fetch data when the component is created
    },
  
    methods: {
      // Fetch the prize data
      fetchDoorprizeData(id) {
        const token = localStorage.getItem("token");
        axios
          .get(`http://127.0.0.1:8000/api/doorprize/get-hadiah/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const doorprize = response.data.data;  // Ensure correct data format
  
            // Populate the form fields with data from the API
            this.nama_hadiah = doorprize.nama_hadiah;
            this.kategori = doorprize.kategori.charAt(0).toUpperCase() + doorprize.kategori.slice(1);  // Ensure matching case for dropdown
            this.sponsor = doorprize.sponsor;
            this.gambar = doorprize.gambar;
            this.jumlah_awal = doorprize.jumlah_awal;
          })
          .catch((error) => {
            console.error("Failed to fetch data:", error);
          });
      },
  
      // Submit form for updating the prize
      submitForm() {
        const token = localStorage.getItem("token");
        const payload = {
          nama_hadiah: this.nama_hadiah,
          kategori: this.kategori,  // Send selected kategori
          sponsor: this.sponsor,
          gambar: this.gambar,
          jumlah_awal: this.jumlah_awal,
        };
  
        axios
          .put(`http://127.0.0.1:8000/api/doorprize/update/${this.id}`, payload, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
          console.log("Prize updated successfully");
          this.$router.push("/pages/ListDoorprizes"); 
        })
          .catch((error) => {
            console.error("Failed to update prize:", error);
          });
      },
    },
  };
  </script>
  