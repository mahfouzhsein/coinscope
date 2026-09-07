<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const props = defineProps({
  id: { type: String, required: true },
  currency: { type: String, default: 'usd' },
  range: { type: String, default: '7' },
})
const emit = defineEmits(['update:range'])
const ranges = [{ label: '24H', value: '1' }, { label: '7D', value: '7' }, { label: '30D', value: '30' }, { label: '90D', value: '90' }, { label: '1Y', value: '365' }]

const query = computed(() => ({ currency: props.currency, days: props.range }))
const { data, status, error, refresh } = await useFetch(() => `/api/charts/${props.id}`, { query, default: () => ({ prices: [] }) })

const chartData = computed(() => ({
  labels: (data.value?.prices || []).map(([time]) => new Intl.DateTimeFormat('en-US', props.range === '1' ? { hour: 'numeric' } : { month: 'short', day: 'numeric' }).format(new Date(time))),
  datasets: [{
    label: `Price (${props.currency.toUpperCase()})`,
    data: (data.value?.prices || []).map(([, price]) => price),
    borderColor: 'rgb(34, 211, 238)',
    backgroundColor: 'rgba(34, 211, 238, 0.08)',
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.25,
    fill: true,
  }],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: false, mode: 'index' },
  plugins: { legend: { display: false } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#64748b', maxTicksLimit: 7 } },
    y: { position: 'right', grid: { color: 'rgba(51,65,85,.35)' }, ticks: { color: '#64748b' } },
  },
}
</script>

<template>
  <section class="surface p-5 sm:p-6">
    <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div><p class="eyebrow">Price action</p><h2 class="mt-1 text-xl font-semibold text-white">Historical performance</h2></div>
      <div class="flex flex-wrap gap-1 rounded-xl bg-slate-950 p-1">
        <button v-for="item in ranges" :key="item.value" class="rounded-lg px-3 py-1.5 text-xs font-semibold transition" :class="range === item.value ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'" @click="emit('update:range', item.value)">{{ item.label }}</button>
      </div>
    </div>
    <BaseErrorState v-if="error" title="Chart unavailable" @retry="refresh" />
    <div v-else-if="status === 'pending'" class="h-80"><BaseSkeleton :lines="8" /></div>
    <div v-else class="h-80"><Line :data="chartData" :options="options" /></div>
  </section>
</template>
