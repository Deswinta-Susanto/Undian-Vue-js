<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Update Kandidat Hadiah Lainnya</strong>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="submitForm">
              <div class="mb-3">
                <CFormLabel for="nipp">NIPP</CFormLabel>
                <CFormInput id="nipp" v-model="nipp" type="number" placeholder="Masukkan NIPP" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="nama">Nama Kandidat</CFormLabel>
                <CFormInput id="nama" v-model="nama" type="text" placeholder="Masukkan Nama Pengguna" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="unit">Unit Kandidat</CFormLabel>
                <CFormInput id="unit" v-model="unit" type="text" placeholder="Masukkan unit" required />
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
        nipp: "",
        nama: "",
        unit: "",
      };
    },
    created() {
      this.fetchDataKandidat(this.id);  
    },
  
    methods: {
        fetchDataKandidat(id) {
        const token = localStorage.getItem("token");
        axios
          .get(`http://127.0.0.1:8000/api/kandidat-hadiah-hidden/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const kandidat = response.data; 
  
            this.nipp = kandidat.nipp;
            this.nama = kandidat.nama
            this.unit = kandidat.unit;
          })
          .catch((error) => {
            console.error("Failed to fetch data:", error);
          });
      },
  
      submitForm() {
        const token = localStorage.getItem("token");
        const payload = {
          nipp: this.nipp,
          nama: this.nama,
          unit: this.unit,
        };
        axios
          .put(`http://127.0.0.1:8000/api/kandidat-hadiah-hidden/${this.id}`, payload, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => this.$router.push("/pages/ListKandidatLainnya"))
          .catch((error) => console.error("Gagal menambah kandidat:", error));
      }
    },
  };
  </script>
  