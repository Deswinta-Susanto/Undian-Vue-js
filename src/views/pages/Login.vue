<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center justify-content-center"
    style="background-color: grey; position: relative;">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="handleLogin">
                  <div class="logo-container text-center mb-4">
                    <img src="@/assets/images/Logo-hd.png" alt="Logo" class="logo" />
                  </div>
                  <h1 class="text-center">Undian PT KAI DAOP 7 Madiun</h1>
                  <p class="text-body-secondary text-center">Masuk untuk mengelola dan memantau proses undian!</p>
                  <div v-if="errorMessage" class="text-center text-danger mb-4">{{ errorMessage }}</div>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput v-model="nama" placeholder="masukkan nama" autocomplete="nama" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput v-model="password" type="password" placeholder="masukkan password"
                      autocomplete="password" />
                  </CInputGroup>
                  <CRow class="justify-content-center">
                    <CCol :xs="6" class="d-flex justify-content-center">
                      <CButton type="submit" color="primary" class="px-4 text-white" :disabled="loading">
                        {{ loading ? 'Loading...' : 'Login' }}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>

    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  data() {
    return {
      nama: '',
      password: '',
      loading: false,
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.errorMessage = '';

      axios
        .post('http://127.0.0.1:8000/api/login', {
          nama: this.nama,
          password: this.password,
        })
        .then((response) => {
          const data = response.data;
          const token = data.token;
          const role = data.data.role;
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          this.$router.push('/pages/GridSpin').then(() => {
          });
        })
        .catch((error) => {
          console.error('Login failed:', error.response);
          this.errorMessage = 'Login gagal, cek kembali nama dan password anda!';
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: orange;
  position: relative;
}

.logo-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.logo {
  width: 100px; /* Adjust the size as needed */
}

.ssb-text {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 4rem;
  color: white;
  font-weight: bold;
  text-align: right;
}

.sub-text {
  font-size: 1.5rem;
  color: white;
  font-weight: normal;
}

.sub {
  font-size: 1.5rem;
  color: white;
  font-weight: normal;
}
</style>

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
