<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Tambah Pengguna</strong>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="submitForm">
              <div class="mb-3">
                <CFormLabel for="nama_event">Nama Event</CFormLabel>
                <CFormInput id="nama_event" v-model="nama_event" type="text" placeholder="Masukkan nama event" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="tanggal_mulai">Tanggal Mulai</CFormLabel>
                <CFormInput id="tanggal_mulai" v-model="tanggal_mulai" type="date" placeholder="Masukkan tanggal mulai" required />
              </div>
              <div class="mb-3">
                <CFormLabel for="tanggal_selesai">Tanggal Selesai</CFormLabel>
                <CFormInput id="tanggal_selesai" v-model="tanggal_selesai" type="date" placeholder="Masukkan tanggal selesai" required />
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
        nama_event: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
      };
    },
  
    methods: {
      submitForm() {
       
        const token = localStorage.getItem("token");
        const payload = {
          nama_event: this.nama_event,
          tanggal_mulai: this.tanggal_mulai,
          tanggal_selesai: this.tanggal_mulai,
        };
        axios
          .post("http://127.0.0.1:8000/api/add-event", payload, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => this.$router.push("/pages/ListEvents"))
          .catch((error) => console.error("Gagal menambah pengguna:", error));
      }
    },
  };
  </script>
  