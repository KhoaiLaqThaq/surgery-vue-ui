<template>
    <div class="container-fluid d-flex pt-2" :id="colorTheme">
        <div class="sidebar" id="sidebar">
            <TheSidebar />
            <div class="toggle-sidebar">
                <span class="d-none show-xs" @click="toggleSidebar()"><XIcon class="text-white" /></span>
            </div>
        </div>
        <div class="col-10 content">
            <TheTopbar />
            <div class="row pb-4">
                <NuxtPage />
            </div>
            <!-- <TheFooter /> -->
        </div>
    </div>
</template> 

<script>
import TheFooter from '~~/components/TheFooter.vue'
import TheTopbar from '~~/components/TheTopbar.vue'
import TheSidebar from '~~/components/TheSidebar.vue'

export default {
    components: {
        TheTopbar,
        TheSidebar,
        TheFooter
    },
    data() {
        return {
            colorTheme: "primary_theme"
        };
    },
    
    setup() {
        const toggleSidebar = () => document.getElementById('sidebar').classList.toggle('show-xs');
        return {
            toggleSidebar
        };
    }
}
</script>
<style lang="scss">
    
</style>
