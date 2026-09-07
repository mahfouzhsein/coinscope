<script setup>
import { computed } from 'vue'
import { formatPercent } from '../../utils/formatters'

const props = defineProps({ value: { type: Number, default: 0 } })
const positive = computed(() => props.value >= 0)
const formattedValue = computed(() => formatPercent(props.value))
</script>

<template>
  <span class="font-medium tabular-nums" :class="positive ? 'text-emerald-400' : 'text-rose-400'">
    {{ formattedValue }}
  </span>
</template>
