<script setup lang="ts">
const router = useRouter();

async function createQuiz() {
  const { data: quiz } = await useFetch('/api/quiz', { method: 'POST' });
  if (quiz.value) {
    let quizId = quiz.value.id;
    router.push(`/quiz/${quizId}`);
  }
}

const quizId = ref('');
</script>

<template>
  <main>
    <button
      class="border rounded p-2 bg-blue-600 text-white"
      @click="createQuiz()"
    >
      Start Quiz
    </button>
    <div>
      <input
        type="text"
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="quizId"
      />
      <button @click="router.push(`/quiz/${quizId}`)">Restore Quiz</button>
    </div>
  </main>
</template>
