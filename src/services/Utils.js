"use strict";

const moment = require("moment");

export default class Utils {
  static currentBillingPeriod(sdate, edate) {
    let sbp = null;
    let ebp = null;

    const currentDateTime = moment();

    if (currentDateTime.date() < sdate) {
      sbp = moment()
        .subtract(1, "months")
        .set("date", sdate);

      ebp = moment().set("date", edate);
    } else {
      sbp = moment().set("date", sdate);

      ebp = moment()
        .add(1, "months")
        .set("date", edate);
    }

    return {
      key: `${sbp.format("D/MMM")} - ${ebp.format("D/MMM")}`,
      start: sbp,
      end: ebp,
      days: ebp.diff(sbp, "days"),
      daysLeft: ebp.diff(currentDateTime, "days")
    };
  }

  static lastTwelveBillingPeriods(sdate, edate) {
    const lastTwelveBillingPeriods = [];

    const currentBillingPeriod = Utils.currentBillingPeriod(sdate, edate);
    lastTwelveBillingPeriods.push({
      start: currentBillingPeriod.start,
      end: currentBillingPeriod.end,
      key: currentBillingPeriod.key
    });

    for (let i = 1; i < 12; i++) {
      const start = currentBillingPeriod.start.clone().subtract(i, "month");
      const end = currentBillingPeriod.end.clone().subtract(i, "month");

      lastTwelveBillingPeriods.push({
        start: start,
        end: end,
        key: `${start.format("D/MMM")} - ${end.format("D/MMM")}`
      });
    }

    return lastTwelveBillingPeriods;
  }
}
