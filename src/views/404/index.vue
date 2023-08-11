<template>
  <div class="not-found">
    <h1 class="title">404</h1>
    <p class="description">Page not found</p>
    <div class="animation">
      <div class="circle"></div>
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <router-link to="/" class="button">Go Back Home</router-link>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: 'Arial', sans-serif;
}
.title {
  font-size: 6rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #6BB392, #D8E699);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 2rem;
  margin-bottom: 4rem;
  color: #666;
}

.animation {
  position: relative;
  width: 150px;
  height: 150px;
}

.circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(45deg, #6BB392, #D8E699);
  animation: circle-rotate 2s linear infinite;
}

.dots {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dot {
  width: 15%;
  height: 15%;
  border-radius: 50%;
  background: linear-gradient(45deg, #6BB392, #D8E699);
  animation: dots-blink 1s infinite;
}

@keyframes circle-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes dots-blink {
  0%, 50% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}

.button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #6BB392, #D8E699);
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background: linear-gradient(45deg, #6BB392, #D8E699);
}
</style>
