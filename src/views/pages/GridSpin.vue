<template>
  <div class="grid-container">
    <div class="card">
      <i class="bi bi-gift" aria-hidden="true"></i>
      <h3>Undian Umum</h3>
      <button @click="handleClick('UndianUmum')">Undian Umum</button>
    </div>
    <div class="card">
      <i class="bi bi-star" aria-hidden="true"></i>
      <h3>Undian Utama</h3>
      <button @click="handleClick('UndianUtama')">Undian Utama</button>
    </div>
    <div class="card">
      <i class="bi bi-box" aria-hidden="true"></i>
      <h3>Undian Lainnya</h3>
      <button @click="handleClick('UndianLainnya')">Undian Lainnya</button>
    </div>
  </div>
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';
export default {
  name: 'GridSpin',
  methods: {
    handleClick(route) {
      this.$router.push({ name: route });
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  gap: 20px; /* Menambahkan spasi antar kartu */
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 340px; /* Lebar kartu diperbesar */
}

i {
  font-size: 50px; /* Sesuaikan ukuran ikon */
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>