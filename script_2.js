import http from "k6/http";
import { check, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  vus: 1000,
  iterations: 3500,
  thresholds: {
    // 99.9% of requests must finish within 2000ms/2s
    http_req_duration: ["p(99.9) < 2000"],
  },
};

export default function () {
  group("API Create (POST)", () => {
    const url = "https://reqres.in/api/users";

    const payload = JSON.stringify({
      name: "morpheus",
      job: "leader",
    });

    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = http.post(url, payload, params);
    check(res, {
      "response code was 201": (res) => res.status == 201,
    });
  });

  group("API Update (PUT)", () => {
    const url = "https://reqres.in/api/users/2";

    const payload = JSON.stringify({
      name: "morpheus",
      job: "zion resident",
    });

    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = http.put(url, payload, params);
    check(res, {
      "response code was 200": (res) => res.status == 200,
    });
  });
}

export function handleSummary(data) {
  return {
    "script_2_result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
