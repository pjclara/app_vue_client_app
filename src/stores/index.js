import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
  
  const appName = "App name"

  return { appName }
})
