<template>
  <div>
    <q-list padding>
      <q-item>
        <q-item-section>
          <q-item-label
            ><q-slider
              v-model="sdate"
              :min="1"
              :max="31"
              :step="1"
              label
              label-always
              color="deep-orange"
              @change="onSdateChange"
          /></q-item-label>
          <q-item-label caption>Billing Period Start Date</q-item-label>
        </q-item-section>
      </q-item>

      <q-item> </q-item>

      <q-item>
        <q-item-section>
          <q-item-label
            ><q-slider
              v-model="edate"
              :min="1"
              :max="31"
              :step="1"
              label
              label-always
              color="deep-orange"
              @change="onEdateChange"
          /></q-item-label>
          <q-item-label caption>Billing Period End Date</q-item-label>
        </q-item-section>
      </q-item>

      <q-item> </q-item>

      <q-item>
        <q-item-section>
          <q-item-label
            ><q-slider
              v-model="maxPages"
              :min="1"
              :max="100"
              :step="1"
              label
              label-always
              color="deep-orange"
              @change="onMaxPagesChange"
          /></q-item-label>
          <q-item-label caption>Max Pages</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "Settings",

  data() {
    return {
      sdate: 13,
      edate: 12,
      maxPages: 15
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      console.log(`Storage: ${JSON.stringify(this.$q.localStorage.getAll())}`);

      if (!this.$q.localStorage.has("PTRACKER_SDATE")) {
        this.onSdateChange();
        this.onEdateChange();
        this.onMaxPagesChange();
      }

      this.sdate = this.$q.localStorage.getItem("PTRACKER_SDATE");
      this.edate = this.$q.localStorage.getItem("PTRACKER_EDATE");
      this.maxPages = this.$q.localStorage.getItem("PTRACKER_MAX_PAGES");
    },

    onSdateChange() {
      this.$q.localStorage.set("PTRACKER_SDATE", this.sdate);
    },

    onEdateChange() {
      this.$q.localStorage.set("PTRACKER_EDATE", this.edate);
    },

    onMaxPagesChange() {
      this.$q.localStorage.set("PTRACKER_MAX_PAGES", this.maxPages);
    }
  }
};
</script>
