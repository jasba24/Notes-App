<template>
  <h1>Choose one option</h1>
  <select @click="getSelectedOption" name="operaciones" id="">
    <option v-for="(o, i) in options" :key="i" :value="o">{{ o }}</option>
  </select>
  <br />
  <br />
  <input
    type="number"
    v-model="numOne"
    placeholder="Ingresa el primer numero"
  />
  <input
    type="number"
    v-model="numTwo"
    placeholder="Ingresa el segundo numero"
  />
  <h1>Result: {{ result }}</h1>
</template>

<script setup>
import { ref, computed } from "vue"

const numOne = ref(0)
const numTwo = ref(0)
const options = ref(["opciones", "suma", "resta", "multiplicacion", "division"])
let operation = ref(null)

const getSelectedOption = (ev) => {
  operation.value = ev.target.value
}

const result = computed(() => {
  const operations = {
    suma: numOne.value + numTwo.value,
    resta: numOne.value - numTwo.value,
    multiplicacion: numOne.value * numTwo.value,
    division: numOne.value / numTwo.value,
  }
  return operations[operation.value]
})
</script>

<script setup></script>

<style></style>
