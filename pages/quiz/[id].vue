<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { QuestionWithoutAnswer } from '~/types/question';
import type { OptionResult, Result } from '~/types/result';

const route = useRoute();

const { id } = route.params;

const { data: quiz, refresh: refreshResult } = await useFetch<Result>(
  () => `/api/quiz/${id}/result`,
  {
    method: 'POST'
  }
);

const currentQno = ref(1);

const questionPath = computed(
  () => `/api/quiz/${id}/question/${currentQno.value}`
);

const { data: question, refresh: refreshQuestion } = await useFetch<{
  id: number;
  question: QuestionWithoutAnswer;
  qno: number;
}>(() => questionPath.value, {
  method: 'POST',
  body: {
    userId: 1
  }
});

async function jumpToQuestion(qno: number) {
  currentQno.value = qno;
  await refreshQuestion();
}
</script>

<template>
  <main>
    <QuestionBox
      :question="question!.question"
      :qno="question!.qno!"
      :quiz-id="(id as string)"
      :result="quiz!.results.find((q: OptionResult) => q.qno == currentQno)!"
      @refresh-result="refreshResult()"
    />
    <QuestionNav
      :results="quiz!.results"
      :currentQno="currentQno"
      @jump-to="jumpToQuestion"
    />
  </main>
</template>
