<template>
    <div>
        <div class="main-container">
            <div class="controls">
                <!-- Event Dropdown -->
                <select v-model="selectedEvent">
                    <option value="" disabled selected>pilih event</option>
                    <option v-for="(event, index) in events" :key="index" :value="event.id">
                        {{ event.nama_event }}
                    </option>
                </select>

                <!-- Doorprize Dropdown -->
                <select v-model="selectedDoorprize" @change="updateSelectedDoorprize">
                    <option value="" disabled selected>pilih doorprize</option>
                    <option v-for="(prize, index) in doorprizes" :key="index" :value="prize.id">
                        {{ prize.nama_hadiah }} - {{  prize.jumlah_sisa }} Item
                    </option>
                </select>

                <!-- Quantity Input -->
                <input v-model.number="quantity" type="number" placeholder="masukkan jumlah undian" />
            </div>

            <!-- Image Container -->
            <div class="image-container" v-if="selectedPrizeImage">
                <img :src="selectedPrizeImage" alt="Doorprize Image" />
            </div>
        </div>

        <!-- Buttons -->
        <div class="button-container">
            <button class="button start" @click="startRandom">Start</button>
            <button class="button stop" @click="stopRandom">Stop</button>
        </div>

        <!-- Random Numbers Display -->
        <div class="number-container">
            <div v-for="(set, index) in randomNumbers" :key="index" class="number-set">
                <div class="numbers-wrapper">
                    <div v-for="(num, numIndex) in set.numbers" :key="numIndex" class="number-box">
                        {{ num }}
                    </div>
                </div>
                <div class="winner-name" v-if="showWinners">
                    {{ set.winner.nama || "Tidak Ada" }} - Unit
                    {{ set.winner.unit || "Tidak Ada" }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const selectedPrizeImage = ref("")
const quantity = ref(0);
const selectedEvent = ref("");
const selectedDoorprize = ref("");
const randomNumbers = ref([]);
const events = ref([]);
const doorprizes = ref([]);
const token = localStorage.getItem("token");
let interval = null;
const showWinners = ref(false);
let finalWinners = [];

onMounted(() => {
    fetchEvents();
    fetchDoorprizes();
});

const fetchEvents = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-event", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        events.value = response.data.data.map((event) => event.event);
    } catch (error) {
        console.error("Error fetching events:", error);
    }
};


const fetchDoorprizes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/doorprize/get-hadiah", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            kategori: "lainnya",
          },
        });

        console.log("Respons Doorprizes:", response.data);

        doorprizes.value = response.data.data;

        doorprizes.value.forEach((prize) => {
          console.log("Nama Hadiah:", prize.nama_hadiah);
          console.log("URL Gambar Hadiah:", prize.gambar);
        });

      } catch (error) {
        console.error("Error fetching doorprizes:", error);
      }
    };
    const updateSelectedDoorprize = () => {
      const selectedPrize = doorprizes.value.find(
        (prize) => prize.id === selectedDoorprize.value
      );

      if (selectedPrize) {
        selectedPrizeImage.value = selectedPrize.gambar || "";
        console.log("URL Gambar Doorprize: ", selectedPrizeImage.value);
      } else {
        console.log("Doorprize tidak ditemukan!");
      }
    };

    const startRandom = async () => {
      if (!selectedEvent.value) {
        alert("Harap pilih event sebelum memulai!");
        return;
      }
      if (!selectedDoorprize.value) {
        alert("Harap pilih doorprize sebelum memulai!");
        return;
      }
      if (!quantity.value || quantity.value <= 0) {
        alert("Harap masukkan jumlah undian yang valid!");
        return;
      }
      
    stopRandom();
    randomNumbers.value = [];
    showWinners.value = false;

    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/kandidat-hadiah-hidden",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    status: "belum menang",
                },
            }
        );

        const candidates = response.data.data;
        const candidateCount = response.data.count;

        if (quantity.value > candidateCount) {
            alert(
                `Jumlah kandidat tidak mencukupi. Maksimum kandidat tersedia: ${candidateCount}`
            );
            return;
        }

        finalWinners = [];
        for (let i = 0; i < quantity.value; i++) {
            const candidate = candidates[Math.floor(Math.random() * candidates.length)];
            finalWinners.push({
                numbers: generateRandomFromNIPP(candidate?.nipp || ""),
                winner: candidate || { nama: "Tidak Ada", nipp: "N/A" },
            });
        }

        interval = setInterval(() => {
            const sets = [];
            for (let i = 0; i < quantity.value; i++) {
                sets.push({
                    numbers: generateRandomNumbers(),
                    winner: finalWinners[i].winner,
                });
            }
            randomNumbers.value = sets;
        }, 100);
    } catch (error) {
        console.error("Error:", error.message || error);
        alert(
            error.message || "Terjadi kesalahan saat memulai randomisasi. Silakan coba lagi."
        );
    }
};

const stopRandom = async () => {
    if (interval) {
        clearInterval(interval);
        interval = null;

        randomNumbers.value = finalWinners;
        showWinners.value = true;

        // Submit winners to the backend
        if (!finalWinners || finalWinners.length === 0) {
            alert("Tidak ada pemenang untuk disubmit.");
            return;
        }

        const payload = {
            riwayat: finalWinners.map((set) => ({
                event_id: selectedEvent.value,
                doorprize_id: selectedDoorprize.value,
                nipp: set.winner.nipp,
            })),
        };

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/riwayat/add",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Data pemenang berhasil disimpan!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting winners:", error.message || error);
            alert("Gagal mengirim data pemenang. Silakan coba lagi.");
        }
    }
};


const generateRandomFromNIPP = (nipp) => {
    const numbers = nipp
        .split("")
        .map((char) => (isNaN(parseInt(char)) ? 0 : parseInt(char)));

    if (numbers.length > 8) {
        return numbers.slice(0, 8);
    }

    while (numbers.length < 8) {
        numbers.push(0);
    }

    return numbers;
};

const generateRandomNumbers = () => {
    const numbers = [];
    for (let i = 0; i < 8; i++) {
        numbers.push(Math.floor(Math.random() * 10));
    }
    return numbers;
};
</script>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column; /* Elements are stacked vertically */
    gap: 20px;
    align-items: center;
}

.controls {
    display: flex;
    flex-direction: row; /* Dropdowns are arranged horizontally */
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.number-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center; /* Ensures numbers are centered below buttons */
    margin-top: 20px; /* Space between the numbers and the buttons */
}

.number-set {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: blue;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    margin-right: 15px;
}

.numbers-wrapper {
    display: flex;
    gap: 10px;
}

.number-box {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    background-color: black;
    color: white;
    margin: 5px;
    border-radius: 8px;
}

.winner-name {
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    text-align: center;
}

.button {
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-weight: bold;
}

.button.start {
    background-color: #007bff;
}

.button.stop {
    background-color: #dc3545;
}

select, input {
    padding: 10px;
    font-size: 1rem;
    width: 250px;
    border-radius: 5px;
}

input {
    width: 150px;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.image-container img {
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
    border-radius: 8px;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px; /* Ensures the buttons are below the image */
}
</style>
