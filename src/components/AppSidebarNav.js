import { defineComponent, h, onMounted, ref, resolveComponent, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { CBadge, CSidebarNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/vue'
import nav from '@/_nav.js'

import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

// Normalisasi path untuk menyamakan format
const normalizePath = (path) =>
  decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(html)$/, '')

// Mengecek apakah link aktif
const isActiveLink = (route, link) => {
  if (!link) return false
  return route.hash === link || normalizePath(route.path) === normalizePath(link)
}

// Mengecek apakah item aktif
const isActiveItem = (route, item) => {
  if (isActiveLink(route, item.to)) return true
  if (item.items) return item.items.some((child) => isActiveItem(route, child))
  return false
}

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const route = useRoute()
    const firstRender = ref(true)
    const sidebarKey = ref(0) // Reactive key for forcing re-render

    const role = localStorage.getItem("role");  // Ambil role dari localStorage

    onMounted(() => {
      firstRender.value = false
    })

    // Watch for changes to force refresh
    watch(route, () => {
      sidebarKey.value += 1 // Change key to trigger re-render
    })

    const filterMenuByRole = (menu) => {
      // Jika role bukan 'Admin', sembunyikan menu 'Users' dan 'Reset Headers'
      if (role !== 'Admin' && (menu.name === 'Users' || menu.name === 'Headers')) {
        return false; // Menyembunyikan menu
      }
      // Jika item memiliki sub-item, filter sub-item juga
      if (menu.items) {
        menu.items = menu.items.filter(filterMenuByRole)
      }
      return true; // Menampilkan menu
    }


    const renderItem = (item) => {
      // Jika item tidak memenuhi filter berdasarkan role, kembalikan null
      if (!filterMenuByRole(item)) {
        return null;
      }

      if (item.items) {
        return h(
          CNavGroup,
          {
            as: 'div',
            compact: true,
            visible: item.items && item.items.some((child) => isActiveItem(route, child)),
          },
          {
            togglerContent: () => [
              h(
                resolveComponent('CIcon') || 'div', // Gunakan fallback jika `CIcon` tidak ada
                {
                  customClassName: 'nav-icon',
                  name: item.icon || '', // Fallback untuk ikon kosong
                },
              ),
              item.name || '', // Fallback jika `name` tidak ada
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        )
      }

      return item.to
        ? h(
            RouterLink,
            {
              to: item.to,
              custom: true,
            },
            {
              default: (props) =>
                h(
                  resolveComponent(item.component) || 'div',
                  {
                    active: props.isActive,
                    as: 'div',
                    href: props.href,
                    onClick: () => props.navigate(),
                  },
                  {
                    default: () => [
                      item.icon
                        ? h(resolveComponent('CIcon') || 'span', {
                            customClassName: 'nav-icon',
                            name: item.icon,
                          })
                        : h('span', { class: 'nav-icon-bullet' }),
                      item.name || '',
                      item.badge &&
                        h(
                          CBadge,
                          {
                            class: 'ms-auto',
                            color: item.badge.color || 'secondary', // Fallback warna badge
                          },
                          {
                            default: () => item.badge.text || '',
                          },
                        ),
                    ],
                  },
                ),
            },
          )
        : h(
            resolveComponent(item.component) || 'div',
            {
              as: 'div',
            },
            {
              default: () => item.name || '', // Fallback jika `name` kosong
            },
          )
    }

    return () =>
      h(
        CSidebarNav,
        {
          as: simplebar,
          key: sidebarKey.value, 
        },
        {
          default: () => nav.filter(filterMenuByRole).map((item) => renderItem(item)), 
        },
      )
  },
})

export { AppSidebarNav }