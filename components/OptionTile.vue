<script setup lang="ts">
import type { Prisma } from '@prisma/client';

const props = defineProps<{
  option: Prisma.OptionGetPayload<{
    select: {
      id: true;
      text: true;
    };
  }>;
  ono: number;
  isSelected: boolean | null;
  isAnswer: boolean | null;
  isPressable: boolean;
}>();

const emit = defineEmits<{
  onSelect: [selectedOptionId: number];
}>();

const alphabets = ['a', 'b', 'c', 'd'];
</script>
<template>
  <button
    class="border rounded-lg p-2 flex items-center text-start"
    :class="{
      'border-red-400': isSelected && !isAnswer,
      'border-green-600': isAnswer
    }"
    @click="isPressable ? $emit('onSelect', option.id) : null"
  >
    <p
      class="text-3xl"
      :class="{
        'text-gray-200': isSelected == null && isAnswer == null,
        'text-red-400': isSelected && !isAnswer,
        'text-green-600': isAnswer
      }"
    >
      {{ alphabets[ono].toUpperCase() }}
    </p>
    <p
      class="pl-4"
      :class="{
        'text-red-400': isSelected && !isAnswer,
        'text-green-600': isAnswer
      }"
    >
      {{ option.text }}
    </p>
  </button>
</template>
