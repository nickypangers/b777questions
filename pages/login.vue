<script setup lang="ts">
const email = ref('');
const password = ref('');
</script>

<template>
  <main>
    {{ email }}
    <div class="grid gap-2">
      <input
        type="email"
        placeholder="Email"
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="email"
      />
      <input
        type="password"
        class="input input-bordered input-sm w-full max-w-xs"
        placeholder="Password"
        v-model="password"
      />
    </div>
  </main>
</template>
