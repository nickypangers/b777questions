<script setup lang="ts">
import type { OptionResult } from '~/types/result';

const props = defineProps<{
  results: OptionResult[];
  currentQno: number;
}>();

const emit = defineEmits<{
  jumpTo: [qno: number];
}>();
</script>

<template>
  <div>
    <div class="grid grid-cols-5 md:grid-cols-10 gap-4">
      <button
        v-for="result in results"
        class="text-center"
        :class="{
          'bg-red-500': result.isCorrect == false,
          'bg-green-500': result.isCorrect,
          'text-white': result.isCorrect != null,
          'border-2': result.qno == currentQno
        }"
        @click="emit('jumpTo', result.qno)"
        :key="`question_result-${result.qno}`"
      >
        {{ result.qno }}
      </button>
    </div>
  </div>
</template>
