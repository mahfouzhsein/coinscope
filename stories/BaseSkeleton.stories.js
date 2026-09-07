import BaseSkeleton from '../app/components/base/BaseSkeleton.vue'

export default {
  title: 'Base/Skeleton',
  component: BaseSkeleton,
  decorators: [() => ({ template: '<div style="width: 28rem; max-width: 80vw"><story /></div>' })],
}

export const Single = { args: { lines: 1 } }
export const List = { args: { lines: 6 } }
