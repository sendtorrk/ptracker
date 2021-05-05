<template>
  <q-page>
    <div>
      <q-tabs v-model="tab" align="justify" narrow-indicator>
        <q-tab name="track" icon="add" label="Track" />
        <q-tab name="report" icon="assessment" label="Report" />
        <q-tab name="settings" icon="settings" label="Settings" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="track">
          <entry />
        </q-tab-panel>

        <q-tab-panel name="report">
          <report />
        </q-tab-panel>

        <q-tab-panel name="settings">
          <settings />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import Settings from "../components/Settings";
import Entry from "../components/Entry";
import Report from "../components/Report";

export default {
  name: "Index",

  components: { Settings, Entry, Report },

  data() {
    return {
      tab: "track"
    };
  }
};
</script>
