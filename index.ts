import censor from "./censor";

require("dotenv").config();
import { TwitterApi } from "twitter-api-v2";
import Pusher from "pusher";

const client = new TwitterApi(process.env.BEARER_TOKEN).v2;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap3",
  useTLS: true,
});

(async () => {
  await deleteAllRules();
  await applyRules();

  const stream = await client.searchStream({
    autoConnect: true,
    expansions: ["author_id"],
    "user.fields": ["id", "name", "username", "profile_image_url"],
  });

  for await (const { data, includes } of stream) {
    const author = (includes?.users ?? [])[0];
    const id = data.id;
    const iconUrl = author.profile_image_url;
    const name = author.name;
    const screenName = author.username;
    const text = data.text;

    const payload = {
      id,
      iconUrl,
      name: censor(name),
      screenName: censor(screenName),
      text: censor(text),
    };

    console.log(".");
    await pusher.trigger("swsb", "tweet", payload);
  }
})();

async function deleteAllRules() {
  const rules = (await client.streamRules()).data ?? [];
  if (rules.length === 0) {
    console.log("no rules.");
    return;
  }

  const ids = rules.map((rule) => rule.id);
  console.log("delete rules: ", ids);

  await client.updateStreamRules({
    delete: {
      ids,
    },
  });
}

async function applyRules() {
  console.log("apply rules");
  const keywords = [
    // "SWSB",
    // "サンリオワールドスマッシュボール",
    // "サンリオスマッシュボール",
    // "サワスボ",
    // "#エバリブーを救いたい",
    "#SWSB全国大会",
  ];

  const updatedRules = await client.updateStreamRules({
    add: [
      {
        value: keywords
          .map((keyword) => `(${keyword} -is:retweet)`)
          .join(" OR "),
      },
    ],
  });
  console.log("rules:", JSON.stringify(updatedRules, null, 2));
}
