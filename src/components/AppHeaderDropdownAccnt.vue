<script setup>
import { ref } from 'vue'
import avatar from '@/assets/images/avatars/avatar.png'
import { useRouter } from 'vue-router'

const router = useRouter()

// Fungsi logout
const logout = () => {
  try {
    // Hapus data dari localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    // Arahkan ke halaman login
    router.push('/pages/login')
  } catch (error) {
    console.error("Logout failed", error)
  }
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
