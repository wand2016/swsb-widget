require("dotenv").config();
import twitter from "twitter";
import Pusher from "pusher";

type Tweet = {
  created_at: string;
  id: number;
  id_str: string;
  text: string;
  source: string;
  truncated: boolean;
  in_reply_to_status_id: number | null;
  in_reply_to_status_id_str: string | null;
  in_reply_to_user_id: number | null;
  in_reply_to_user_id_str: string | null;
  in_reply_to_screen_name: string | null;
  user: {
    id: number;
    id_str: string;
    name: string;
    screen_name: string;
    location: string | null;
    url: string | null;
    description: string;
    translator_type: string;
    profile_image_url_https: string;
  };
  timestamp_ms: string;
};

const twit = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap3",
  useTLS: true,
});

const keywords = [
  "SWSB",
  "サンリオワールドスマッシュボール",
  "サンリオスマッシュボール",
  "サワスボ",
  "#エバリブーを救いたい",
];

/**
 * comma means OR. {@see https://developer.twitter.com/en/docs/twitter-api/v1/tweets/filter-realtime/guides/basic-stream-parameters}
 */
const track = keywords.join(",");

twit.stream("statuses/filter", { track }, (stream) => {
  stream.on("data", async (data: Tweet) => {
    const id = data.id_str;
    const iconUrl = data.user.profile_image_url_https;
    const name = data.user.name;
    const screenName = data.user.screen_name;
    const text = data.text;

    await pusher.trigger("swsb", "tweet", {
      id,
      iconUrl,
      name,
      screenName,
      text,
    });

    console.log(".");
  });
});
