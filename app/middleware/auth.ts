export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    if (!user.value && to.path === '/main') {
        navigateTo('/registration')
    }

    if (user.value && to.path === '/registration') {
        navigateTo('/main')
    }

    if (user.value && to.path === '/') {
        navigateTo('/main')
    }
})