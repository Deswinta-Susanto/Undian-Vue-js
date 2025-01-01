<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Tambah Kandidat Hadiah Umum</strong>
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
        nipp: "",
        nama: "",
        unit: "",
      };
    },
  
    methods: {
      submitForm() {
        const token = localStorage.getItem("token");
        const payload = {
          nipp: this.nipp,
          nama: this.nama,
          unit: this.unit,
        };
        axios
          .post("http://127.0.0.1:8000/api/kandidat-hadiah-umum/post", payload, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => this.$router.push("/pages/ListKandidatUmum"))
          .catch((error) => console.error("Gagal menambah kandidat:", error));
      }
    },
  };
  </script>
  