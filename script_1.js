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
    console.log(JSON.stringify(res.body));
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
    console.log(JSON.stringify(res.body));
  });
}
