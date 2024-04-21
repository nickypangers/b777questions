<script setup lang="ts">
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>
<template>
  <main>
    <div class="grid gap-2">
      <input
        type="email"
        placeholder="Email"
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        class="input input-bordered input-sm w-full max-w-xs"
        v-model="confirmPassword"
      />
    </div>
  </main>
</template>
