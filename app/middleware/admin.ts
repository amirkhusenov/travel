export default defineNuxtRouteMiddleware((to) => {
    if (process.client) {
        const adminSession = localStorage.getItem('adminSession')
        const adminLoginTime = localStorage.getItem('adminLoginTime')

        if (!adminSession || !adminLoginTime) {
            return navigateTo('/admin-login')
        }
        const loginTime = parseInt(adminLoginTime)
        const currentTime = Date.now()
        const sessionDuration = 24 * 60 * 60 * 1000

        if (currentTime - loginTime > sessionDuration) {
            localStorage.removeItem('adminSession')
            localStorage.removeItem('adminLoginTime')
            return navigateTo('/admin-login')
        }
    }
})
