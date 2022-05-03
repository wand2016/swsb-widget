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

/**
 * thanks to {@link https://11-30am.com/49/#google_vignette}
 * 見るに耐えないのでパーセントエンコードのちbase64してある
 */
const list = [
  "JUUzJTgyJUEyJUUzJTgzJThBJUUzJTgzJUFC",
  "JUUzJTgyJUFGJUUzJTgzJUIzJUUzJTgzJThC",
  "JUUzJTgyJUJCJUUzJTgzJTgzJUUzJTgyJUFGJUUzJTgyJUI5",
  "JUUzJTgyJUJCJUUzJTgzJTk1JUUzJTgzJUFD",
  "JUUzJTgzJUE0JUUzJTgzJUFBJUU1JThGJThC",
  "JUUzJTgzJTg3JUUzJTgzJUFBJUUzJTgzJTk4JUUzJTgzJUFC",
  "JUUzJTgzJTk1JUUzJTgyJUE3JUUzJTgzJUE5",
  "JUUzJTgzJTk1JUUzJTgyJUExJUUzJTgzJTgzJUUzJTgyJUFG",
  "JUUzJTgxJUExJUUzJTgyJTkzJUUzJTgxJTkz",
  "JUUzJTgxJUExJUUzJTgyJTkzJUUzJTgxJUJE",
  "JUUzJTgzJTgxJUUzJTgzJUIzJUUzJTgyJUIz",
  "JUUzJTgxJUExJUUzJTgyJTkzJUUzJTgxJUExJUUzJTgyJTkz",
  "JUUzJTgzJTgxJUUzJTgzJUIzJUUzJTgzJTgxJUUzJTgzJUIz",
  "JUUzJTgzJTgxJUUzJTgzJUIzJUUzJTgzJTlE",
  "JUUzJTgzJTkxJUUzJTgyJUE0JUUzJTgzJTkxJUUzJTgzJUIz",
  "JUUzJTgzJTkwJUUzJTgyJUE0JUUzJTgzJTk2",
  "JUUzJTgzJTlFJUUzJTgzJUIzJUUzJTgyJUIz",
  "JUUzJTgyJUE0JUUzJTgzJUIzJUUzJTgzJTlE",
  "JUUzJTgxJTg4JUUzJTgxJUEzJUUzJTgxJUEx",
  "JUUzJTgyJUI5JUUzJTgyJUFCJUUzJTgzJTg4JUUzJTgzJUFE",
  "JUUzJTgyJUFCJUUzJTgyJUE2JUUzJTgzJTkxJUUzJTgzJUJD",
  "JUUzJTgzJThFJUUzJTgzJUJDJUUzJTgzJTkxJUUzJTgzJUIz",
  "JUUzJTgyJUFBJUUzJTgzJThBJUUzJTgzJThC",
  "JUUzJTgyJUFBJUUzJTgzJThBJUUzJTgzJThCJUUzJTgzJUJD",
  "JUUzJTgzJTlFJUUzJTgyJUI5JUUzJTgyJUJGJUUzJTgzJUJDJUUzJTgzJTk5JUUzJTgzJUJDJUUzJTgyJUI3JUUzJTgzJUE3JUUzJTgzJUIz",
  "JUUzJTgzJUE5JUUzJTgzJTk2JUUzJTgzJTg5JUUzJTgzJUJDJUUzJTgzJUFC",
  "JUUzJTgzJTkxJUUzJTgzJUIzJUUzJTgzJTgxJUUzJTgzJUE5",
  "JUUzJTgzJTkzJUUzJTgzJTgzJUUzJTgzJTgx",
  "JUUzJTgxJUI1JUUzJTgxJTlGJUUzJTgxJUFBJUUzJTgyJThB",
  "JUUzJTgzJUI0JUUzJTgyJUExJUUzJTgyJUFFJUUzJTgzJThB",
  "JUUzJTgyJUFGJUUzJTgzJUFBJUUzJTgzJTg4JUUzJTgzJUFBJUUzJTgyJUI5",
  "JUUzJTgzJThDJUUzJTgzJUJDJUUzJTgzJTg5",
  "JUU1JTk2JTk4JUUzJTgxJTg0JUUzJTgxJUE3",
  "JUU2JTg5JThCJUUzJTgyJUIzJUUzJTgyJUFE",
  "JUU2JTg5JThCJUUzJTgzJTlFJUUzJTgzJUIz",
  "JUU2JUJEJUFFJUU1JTkwJUI5",
  "JUU0JUI4JUFEJUUzJTgxJUEwJUUzJTgxJTk3",
  "JUU0JUI4JUFEJUU1JTg3JUJBJUUzJTgxJTk3",
  "JUU4JTg2JUEz",
  "JUU4JTg1JTlG",
  "JUU4JTg3JUFBJUU2JTg1JUIw",
  "JUU1JThDJTg1JUU4JThDJThF",
  "JUU5JUEyJUE4JUU0JUJGJTk3",
  "JUU3JUIyJUJFJUU1JUFEJTkw",
  "JUU2JTk3JUE5JUU2JUJDJThG",
  "JUU1JUIwJTg0JUU3JUIyJUJF",
  "JUU5JTk5JUIwJUU2JUFGJTlC",
  "JUU3JUI1JUI2JUU1JTgwJUFC",
  "JUU1JUI3JUE4JUU0JUI5JUIz",
  "JUU4JUIyJUE3JUU0JUI5JUIz",
  "JUU2JUI3JUFCJUU0JUI5JUIx",
  "JUU1JTg5JThEJUU3JUFCJThCJUU4JTg1JUJB",
  "JUU2JThGJUI0JUU0JUJBJUE0",
  "JUU2JUI1JUEzJUU4JTg1JUI4",
  "JUU0JUJBJTgwJUU3JTk0JUIyJUU3JUI4JTlC",
  "JUU5JTlCJUJCJUUzJTgzJTlF",
  "JUU4JTgyJTg5JUU2JUEzJTky",
  "JUU1JThCJTgzJUU4JUI1JUI3",
  "JUUzJTgxJThBJUUzJTgxJUEzJUUzJTgxJUIxJUUzJTgxJTg0",
  "JUUzJTgxJUIxJUUzJTgxJTg0JUUzJTgxJThBJUUzJTgxJUE0",
  "JUU2JUFEJUJCJUUzJTgxJUFE",
  "JUU2JUFEJUJCJUUzJTgyJTkzJUUzJTgxJUE3JUVGJUJDJTgx",
  "JUU2JUFEJUJCJUUzJTgyJTkzJUUzJTgxJUE3JUUzJTgxJThGJUUzJTgyJThD",
  "JUU2JUFEJUJCJUUzJTgyJTkzJUUzJTgxJUEwJUUzJTgyJTg5JUUzJTgxJTg0JUUzJTgxJTg0",
  "JUUzJTgxJThGJUUzJTgxJTlGJUUzJTgxJUIwJUUzJTgyJThDJUVGJUJDJTgx",
  "JUU2JUFFJUJBJUUzJTgxJTk5",
  "JUU2JUFFJUJBJUUzJTgxJTlCJUVGJUJDJTgx",
  "JUU0JUI5JTlFJUU5JUEzJTlG",
  "JUU3JUIyJUJFJUU3JUE1JTlFJUU3JTk1JUIwJUU1JUI4JUI4",
  "JUUzJTgzJUE0JUUzJTgzJUFBJUUzJTgzJTlFJUUzJTgzJUIz",
  "JUUzJTgxJUI2JUUzJTgxJUEzJUUzJTgxJThCJUUzJTgxJTkx",
  "JUUzJTgyJUI2JUUzJTgzJUJDJUUzJTgzJUExJUUzJTgzJUIz",
  "JUU0JUI5JUIxJUU0JUJBJUE0",
  "JUU4JUEzJThGJUUzJTgzJTkzJUUzJTgzJTg3JUUzJTgyJUFB",
  "JUU0JUJEJTkzJUU0JUJEJThE",
  "JUU5JUE4JThFJUU0JUI5JTk3JUU0JUJEJThE",
  "JUU2JUFEJUEzJUU1JUI4JUI4JUU0JUJEJThE",
  "JUU1JUJFJThDJUU4JTgzJThDJUU0JUJEJThE",
  "JUU1JUJBJUE3JUU0JUJEJThE",
  "QVYlRTUlQTUlQjMlRTUlODQlQUE=",
  "JUUzJTgzJTkzJUUzJTgyJUFEJUUzJTgzJThC",
  "VCVFMyU4MyU5MCVFMyU4MyU4MyVFMyU4MiVBRg==",
  "JUVGJUJDJUI0JUUzJTgzJTkwJUUzJTgzJTgzJUUzJTgyJUFG",
  "JUU3JUI0JTkwJUUzJTgzJTkxJUUzJTgzJUIz",
  "U0VY",
  "JUVGJUJDJUIzJUVGJUJDJUE1JUVGJUJDJUI4",
  "JUUzJTgyJUJCJUUzJTgyJUFGJUUzJTgzJUFEJUUzJTgyJUI5",
  "M1A=",
  "JUVGJUJDJTkzJUVGJUJDJUIw",
  "JUUzJTgyJUFEJUUzJTgzJUEyJUUzJTgzJTg3JUUzJTgzJTk2",
  "JUUzJTgzJTk2JUUzJTgyJUI5",
  "JUUzJTgzJTkwJUUzJTgzJTkwJUUzJTgyJUEx",
  "JUUzJTgzJTkwJUUzJTgzJTkwJUUzJTgyJUEy",
  "JUUzJTgzJTg3JUUzJTgzJTk2",
  "JUU1JTlDJUE4JUU2JTk3JUE1JUU2JTlDJTlEJUU5JUFFJUFFJUU0JUJBJUJB",
  "JUU3JTgxJUFCJUU3JTk3JTg1",
  "JUU2JTlFJTk1JUU1JTk2JUI2JUU2JUE1JUFE",
  "JUU0JUJEJThFJUU4JTgzJUJEJUUzJTgyJUFGJUUzJTgyJUJB",
  "JUUzJTgyJUFEJUUzJTgzJTgxJUUzJTgyJUFDJUUzJTgyJUE0",
  "JUUzJTgyJUI0JUUzJTgzJTlGJUU5JTg3JThFJUU5JTgzJThF",
  "JUUzJTgyJUI0JUUzJTgzJTlGJUUzJTgyJUFGJUUzJTgyJUJB",
  "JUU2JUIwJTk3JUU2JThDJTgxJUUzJTgxJUExJUU2JTgyJUFBJUUzJTgxJTk5JUUzJTgxJThFJUUzJTgxJUE2JUU1JTkwJTkwJUUzJTgxJThEJUU2JUIwJTk3",
  "JUU2JUIwJTk3JUU2JThDJTgxJUUzJTgxJUExJUU2JTgyJUFBJUUzJTgxJThGJUUzJTgxJUE2JUU1JTkwJTkwJUUzJTgxJThEJUU2JUIwJTk3",
];

function censor(text: string): string {
  const pattern = list
    .map((element) => decodeURIComponent(atob(element)))
    .concat(["わこつ", "なるほどです"]) // ついでに処す
    .join("|");
  const regex = new RegExp(pattern, "ig");
  return text.replace(regex, "***");
}

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
