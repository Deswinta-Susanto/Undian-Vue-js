<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Tambah Hadiah</strong>
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
                  <option value="umum">Umum</option>
                  <option value="utama">Utama</option>
                  <option value="lainnya">Lainnya</option>
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
      nama_hadiah: "",
      kategori: "",
      sponsor: "",
      gambar: "",
      jumlah_awal: "",
    };
  },

  methods: {
    submitForm() {
      const token = localStorage.getItem("token");
      const payload = {
        nama_hadiah: this.nama_hadiah,
        kategori: this.kategori,
        sponsor: this.sponsor,
        gambar: this.gambar,
        jumlah_awal: this.jumlah_awal,
      };
      axios
        .post("http://127.0.0.1:8000/api/doorprize/add-hadiah", payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => this.$router.push("/pages/ListDoorprizes"))
        .catch((error) => console.error("Gagal menambah hadiah:", error));
    }
  },
};
</script>
