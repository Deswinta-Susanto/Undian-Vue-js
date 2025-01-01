<template>
    <CRow>
      <CCol :xs="12">
        <CCard class="mb-4">
          <CCardHeader>
            <strong>Update Event</strong>
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
            id: this.$route.params.id,
            nama_event: "",
            tanggal_mulai: "",
            tanggal_selesai: "",
        };
    },
    created() {
        this.fetchEventData(this.id);
    },
   
    methods: {
    fetchEventData(id) {
        const token = localStorage.getItem("token");
        axios
            .get(`http://127.0.0.1:8000/api/get-event/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const event = response.data.data.event;

                this.nama_event = event.nama_event;
                this.tanggal_mulai = event.tanggal_mulai;
                this.tanggal_selesai = event.tanggal_selesai;
                this.status = response.data.data.status; 
            })
            .catch((error) => {
                console.error("Gagal mengambil data:", error);
            });
    },

        submitForm() {
           
            const id = this.$route.params.id;
            const token = localStorage.getItem("token");
            const dataToSend = {
                nama_event: this.nama_event,
                tanggal_mulai: this.tanggal_mulai,
                tanggal_selesai: this.tanggal_selesai,
            };

            console.log("Data yang dikirim:", dataToSend);

            axios.put(`http://127.0.0.1:8000/api/edit-event/${id}`, dataToSend, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    console.log("Event berhasil diupdate:", response.data);
                    this.$router.push('/pages/ListEvents');
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        console.error("Gagal update event:", error.response.data);
                    } else {
                        console.error("Gagal update event:", error);
                    }
                });
        }
    },
};
</script>