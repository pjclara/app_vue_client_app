import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import avatarNoneUrl from '@/assets/avatar-none.png'

export const useUserStore = defineStore('user', () => {
    const axios = inject('axios')
    //const //socket = inject("//socket")
    const toast = inject("toast")

    const serverBaseUrl = inject('serverBaseUrl')
    
    const user = ref(null)
    const errors = ref(null)

    
    const userPhotoUrl = computed(() => {
        if (!user.value?.photo_url) {
            return avatarNoneUrl
        }
        return serverBaseUrl + '/storage/fotos/' + user.value.photo_url
    })
    
    const userId = computed(() => {
        return user.value?.id ?? -1
    })

    async function loadUser () {
        try {
            const response = await axios.get('users/me')
            user.value = response.data.data
        } catch (error) {
            clearUser () 
            throw error
        }
    }
    
    function clearUser () {
        delete axios.defaults.headers.common.Authorization
        sessionStorage.removeItem('token')
        user.value = null
    }  
    
    async function login (credentials) {
        try {
            const response = await axios.post('login', credentials)
            axios.defaults.headers.common.Authorization = "Bearer " + response.data.access_token
            sessionStorage.setItem('token', response.data.access_token)
            await loadUser()
            //socket.emit('loggedIn', user.value)
            return true       
        } 
        catch(error) {
            clearUser()
            return false
        }
    }
    
    async function logout () {
        try {
            await axios.post('logout')
            //socket.emit('loggedOut', user.value)
            clearUser()
            return true
        } catch (error) {
            return false
        }
    }

    async function restoreToken () {
        let storedToken = sessionStorage.getItem('token')
        if (storedToken) {
            axios.defaults.headers.common.Authorization = "Bearer " + storedToken
            await loadUser()
            console.log('storedToken')
            console.log(storedToken)
            console.log('emit loggedIn')
            console.log(user.value)
            //socket.emit('loggedIn', user.value)
            return true
        }
        clearUser()
        return false
    }

    async function changePassword (passwords) {
        errors.value = null
        if (passwords.password != passwords.password_confirmation) {
            return false
        }
        try {
            await axios.patch('users/' +userId.value + '/password', passwords)
            return true;
        } catch (error) {
            if (error.response.status == 422) {
                errors.value = error.response.data.errors
            }
            return false
        }
    }

/*     //socket.on('updateUser', (updatedUser) => {
        console.log('Someone else has updated the user #' + updatedUser.id)
        if (user.value?.id == updatedUser.id) {
            user.value = updatedUser
            toast.info('Your user profile has been changed!')
        } else {
            toast.info(`User profile #${updatedUser.id} (${updatedUser.name}) has changed!`)
        }
    })     */
    
    return { user, errors, userId, userPhotoUrl, login, logout, restoreToken, changePassword }
})
