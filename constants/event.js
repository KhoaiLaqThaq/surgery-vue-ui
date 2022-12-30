import { onMounted, onUnmounted } from "vue";

export function useEventListener(target, event, callback) {
    onMounted(() => target.addListener(event, callback))
    onUnmounted(() => target.removeListener(event, callback))
}
