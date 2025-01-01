<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Update Header</strong>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="submitForm">
              <div class="mb-3">
                <CFormLabel for="nama_header">Masukkan Update Header</CFormLabel>
                <CFormInput id="nama_header" v-model="nama_header" type="text" placeholder="Masukkan Nama Header" required />
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
            
            nama_header: "",
        };
    },
    created() {
        this.fetchHeaderData(2);
    },
   
    methods: {
        fetchHeaderData(id) {
            const token = localStorage.getItem("token");
            axios
                .get(`http://127.0.0.1:8000/api/customize-header/get/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const header = response.data.data;
  
                    // Set data pengguna
                    this.nama_header = header.nama_header;
   
                })
                .catch((error) => {
                    console.error("Gagal mengambil data:", error);
                });
        },
  
       
        submitForm() {
  
            const id = 2;
            const token = localStorage.getItem("token");
            const dataToSend = {
                nama_header: this.nama_header,
            };
  
            console.log("Data yang dikirim:", dataToSend);
  
            axios.put(`http://127.0.0.1:8000/api/customize-header/update/${id}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    console.log(" berhasil diupdate:", response.data);
                    this.$router.push('/pages/GridSpin'); // Arahkan setelah berhasil
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        console.error("Gagal update:", error.response.data);
                    } else {
                        console.error("Gagal update:", error);
                    }
                });
        }
    },
  };
  </script>