<script setup>
import { formatPercent } from '../../utils/formatters'

const props = defineProps({ value: { type: Number, default: 0 } })
const positive = computed(() => props.value >= 0)
</script>

<template>
  <span class="font-medium tabular-nums" :class="positive ? 'text-emerald-400' : 'text-rose-400'">
    {{ formatPercent(value) }}
  </span>
</template>
