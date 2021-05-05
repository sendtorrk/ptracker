<template>
  <div>
    <q-list padding separator>
      <q-item v-for="h in history" :key="h.key">
        <q-item-section>
          <span>{{ h.key }}</span>
        </q-item-section>

        <q-item-section side>
          <span>{{ h.pagesPrinted }}</span>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import Utils from "../services/Utils";

export default {
  name: "Report",

  data() {
    return {
      history: []
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      const data = this.$q.localStorage.getAll();
      console.log(`Report: load: storage: ${JSON.stringify(data)}`);

      const sdate = data.PTRACKER_SDATE;
      const edate = data.PTRACKER_EDATE;

      const lastTwelveBillingPeriods = Utils.lastTwelveBillingPeriods(
        sdate,
        edate
      );

      this.history = [];

      lastTwelveBillingPeriods.forEach(bp => {
        console.log(JSON.stringify(bp));

        if (this.$q.localStorage.has(bp.key)) {
          this.history.push({
            key: bp.key,
            pagesPrinted: this.$q.localStorage.getItem(bp.key)
          });
        } else {
          this.history.push({
            key: bp.key,
            pagesPrinted: 0
          });
        }
      });

      console.log(JSON.stringify(this.history));
    }
  }
};
</script>
