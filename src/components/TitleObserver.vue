<script setup>
import { CONFIG } from '@/config/base';
import { useRouter } from 'vue-router';

const router = useRouter()

router.afterEach((to, from, failure) => {
    if (!failure) {
        if (to.meta.pageTitle) {
            window.document.title = `${to.meta.pageTitle} | ${CONFIG.siteName}`;
        } else {
            window.document.title = CONFIG.siteName;
        }
    }
})
</script>