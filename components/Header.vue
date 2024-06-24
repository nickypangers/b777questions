<script setup lang="ts">
const router = useRouter();
</script>
<template>
  <header>
    <div class="p-2 flex justify-between items-center">
      <div>
        <button @click="router.push('/')">B777Questions</button>
      </div>
      <div class="grid grid-flow-col gap-2">
        <button class="btn btn-primary btn-sm" @click="router.push('/login')">
          Login
        </button>
        <button
          class="btn btn-primary btn-sm"
          @click="router.push('/register')"
        >
          Register
        </button>
      </div>
    </div>
  </header>
</template>
