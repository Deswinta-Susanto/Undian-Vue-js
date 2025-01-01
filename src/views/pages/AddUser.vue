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
              <CFormLabel for="niip">NIPP</CFormLabel>
              <CFormInput id="niip" v-model="niip" type="number" placeholder="Masukkan NIPP" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="nama">Nama Pengguna</CFormLabel>
              <CFormInput id="nama" v-model="nama" type="text" placeholder="Masukkan Nama Pengguna" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="unit">Unit Pengguna</CFormLabel>
              <CFormInput id="unit" v-model="unit" type="text" placeholder="Masukkan unit" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="role">Role</CFormLabel>
              <CFormSelect id="role" v-model="role" required>
                <option value="" disabled selected>Pilih Role</option>
                <option value="General">General</option>
                <option value="Admin">Admin</option>
              </CFormSelect>
            </div>
            <div class="mb-3">
              <CFormLabel for="password">Password</CFormLabel>
              <CFormInput id="password" v-model="password" type="password" placeholder="Masukkan Password" required />
            </div>
            <div class="mb-3">
              <CFormLabel for="password_confirmation">Konfirmasi Password</CFormLabel>
              <CFormInput id="password_confirmation" v-model="password_confirmation" type="password" placeholder="Konfirmasi Password" required />
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
      niip: "",
      nama: "",
      unit: "",
      role: "",
      password: "",
      password_confirmation: "",
    };
  },

  methods: {
    submitForm() {
      if (this.password !== this.password_confirmation) {
        alert("Password dan konfirmasi password tidak sama.");
        return;
      }
      const token = localStorage.getItem("token");
      const payload = {
        niip: this.niip,
        nama: this.nama,
        unit: this.unit,
        role: this.role,
        password: this.password,
      };
      axios
        .post("http://127.0.0.1:8000/api/register", payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => this.$router.push("/pages/ListUsers"))
        .catch((error) => console.error("Gagal menambah pengguna:", error));
    }
  },
};
</script>