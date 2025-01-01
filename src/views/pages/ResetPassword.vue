<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Update Pengguna</strong>
        </CCardHeader>
        <CCardBody>
          <CForm @submit.prevent="submitForm">
            <div class="mb-3">
              <CFormLabel for="niip">NIPP</CFormLabel>
              <CFormInput id="niip" v-model="niip" type="number" placeholder="Masukkan NIPP" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="nama">Nama Nama Pengguna</CFormLabel>
              <CFormInput id="nama" v-model="nama" type="text" placeholder="Masukkan Nama Pengguna" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="unit">Unit Pengguna</CFormLabel>
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
          nama: "",
          unit: "",
          niip: "",
      };
  },
  created() {
      this.fetchUserData(this.id);
  },
 
  methods: {
      fetchUserData(id) {
          const token = localStorage.getItem("token");
          axios
              .get(`http://127.0.0.1:8000/api/getAdmin/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
              })
              .then((response) => {
                  const user = response.data;

                  // Set data pengguna
                  this.nama = user.nama;
                  this.unit = user.unit;
                  this.niip = user.niip;
              })
              .catch((error) => {
                  console.error("Gagal mengambil data pengguna:", error);
              });
      },

     
      submitForm() {
          if (this.password !== this.password_confirmation) {
              alert("Password dan konfirmasi password tidak sama.");
              return;
          }

          const id = this.$route.params.id;
          const token = localStorage.getItem("token");
          const dataToSend = {
              nama: this.nama,
              unit: this.unit,
              niip: this.niip, // Pastikan ini benar
          };

          console.log("Data yang dikirim:", dataToSend);

          axios.put(`http://127.0.0.1:8000/api/updateAdmin/${id}`, dataToSend, {
              headers: { Authorization: `Bearer ${token}` }
          })
              .then((response) => {
                  console.log("Pengguna berhasil diupdate:", response.data);
                  this.$router.push('/pages/ListUsers'); // Arahkan setelah berhasil
              })
              .catch((error) => {
                  if (error.response && error.response.data) {
                      console.error("Gagal update pengguna:", error.response.data);
                  } else {
                      console.error("Gagal update pengguna:", error);
                  }
              });
      }
  },
};
</script>