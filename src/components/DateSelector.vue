<template>
  <q-input filled v-model="date" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date v-model="date" minimal @input="setSelectedDate">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "DateSelector",
  props: ["defaultDate"],
  data() {
    return {
      date: null
    };
  },
  mounted() {
    this.date = this.defaultDate ? this.defaultDate : null;
  },
  methods: {
    setSelectedDate(val) {
      this.$emit("selected", val);
    }
  }
};
</script>
