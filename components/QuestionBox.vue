<script setup lang="ts">
import type { QuestionWithoutAnswer } from '~/types/question';
import type { OptionResult } from '~/types/result';

const props = defineProps<{
  question: QuestionWithoutAnswer;
  qno: number;
  quizId: string;
  result: OptionResult;
}>();

const sortedOptions = computed(() =>
  props.question.options.sort((a, b) => a.id - b.id)
);

const selectedOptionId = computed(() => props.result.selectedOptionId);

const answerId = computed(() => props.result.answerId);

async function submitAnswer(soId: number) {
  const result = await $fetch(
    `/api/quiz/${props.quizId}/question/${props.qno}/answer`,
    {
      method: 'POST',
      body: {
        selectedOptionId: soId
      }
    }
  );
  emit('refreshResult');
}

const emit = defineEmits<{
  refreshResult: [];
}>();
</script>
<template>
  <div class="border rounded-lg p-2 grid gap-2">
    <p class="text-sm">QID: {{ question.id }}</p>
    <p class="font-bold">{{ `${qno}. ${question.text}` }}</p>
    <OptionTile
      v-for="(option, index) in sortedOptions"
      :option="option"
      :ono="index"
      :key="`option-${option.id}`"
      :is-selected="option.id == selectedOptionId"
      :is-answer="option.id == answerId"
      :is-pressable="result.answerId == null"
      @on-select="submitAnswer"
    />
  </div>
</template>
<style scoped>
* {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
</style>
