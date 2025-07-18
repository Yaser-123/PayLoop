import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import { ARCJET_KEY, ARCJET_ENV } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: ARCJET_ENV === 'development' ? "DRY_RUN" : "LIVE" }),
    detectBot({
      mode: ARCJET_ENV === 'development' ? "DRY_RUN" : "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
      ],
    }),
    tokenBucket({
      mode: ARCJET_ENV === 'development' ? "DRY_RUN" : "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
