<template>
  <div>
    <div class="row justify-center" style="padding-top: 32px">
      <span class="text-h6">GO GREEN!</span>
    </div>

    <div class="row justify-center">
      <span class="text-subtitle1">{{
        new Date() | moment("D/MMM/YYYY")
      }}</span>
    </div>

    <div class="row justify-center" style="padding-top: 32px">
      <span class="text-bold">{{ bpDisplay }}</span>
    </div>

        <div class="row justify-center">
      <span class="text-caption">BILLING PERIOD</span>
    </div>


    <q-separator />

    <div class="row justify-center" style="padding-top: 32px">
      <span class="text-h4">{{ printed }}</span>
    </div>

    <div class="row justify-center" v-if="printedWarning != null">
      <span class="text-bold">{{ printedWarning }}</span>
    </div>

    <div class="row justify-center">
      <span class="text-caption">PRINTED</span>
    </div>

    <q-separator />

    <div class="row justify-center" style="padding-top: 32px">
      <div style="padding-right: 10px">
        <q-btn round color="blue" icon="remove" @click="remove" size="30px" />
      </div>

      <div>
        <q-btn round :color="addColor" icon="add" @click="add" size="30px" />
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "../services/Utils";

export default {
  name: "Entry",

  data() {
    return {
      bpKey: null,
      bpDisplay: null,
      printed: null,
      printedWarning: null,
      addColor: "green"
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    load() {
      const data = this.$q.localStorage.getAll();
      console.log(`Entry: load: storage: ${JSON.stringify(data)}`);

      const sdate = data.PTRACKER_SDATE;
      const edate = data.PTRACKER_EDATE;
      const maxPages = data.PTRACKER_MAX_PAGES;

      const billingPeriod = Utils.currentBillingPeriod(sdate, edate);

      this.bpKey = billingPeriod.key;
      this.bpDisplay = `${this.bpKey} (total ${billingPeriod.days} days, ${billingPeriod.daysLeft} days left)`;

      if (!this.$q.localStorage.has(this.bpKey)) {
        this.$q.localStorage.set(this.bpKey, 0);
      }

      const pagesPrinted = this.$q.localStorage.getItem(this.bpKey);

      this.printed = `${pagesPrinted} of ${maxPages}`;
      if (pagesPrinted >= maxPages) {
        this.printedWarning = `You have reached or exceeded your monthly limit`;
        this.addColor = "red";
      } else {
        this.printedWarning = null;
        this.addColor = "green";
      }
    },

    add() {
      const pagesPrinted = this.$q.localStorage.getItem(this.bpKey);
      this.$q.localStorage.set(this.bpKey, pagesPrinted + 1);

      console.log(
        `Entry: add: Storage: ${JSON.stringify(this.$q.localStorage.getAll())}`
      );

      this.load();
    },

    remove() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure?",
          persistent: true,
          cancel: true
        })
        .onOk(() => {
          const pagesPrinted = this.$q.localStorage.getItem(this.bpKey);

          if (pagesPrinted > 0) {
            this.$q.localStorage.set(this.bpKey, pagesPrinted - 1);
          }

          console.log(
            `Entry: remove: storage: ${JSON.stringify(
              this.$q.localStorage.getAll()
            )}`
          );

          this.load();
        })
        .onCancel(() => {
          this.load();
        });
    }
  }
};
</script>
