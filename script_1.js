import http from "k6/http";
import { check, group } from "k6";

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
}
