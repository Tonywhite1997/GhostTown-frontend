import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../contexts/AuthContext";
import { UserType } from "../types/types";

function useFeed() {
  const [feed, setFeed] = useState<UserType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreFeed, setIsMoreFeed] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [moreFeedError, setMoreFeedError] = useState<string>("");

  async function getFeed() {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BASE_URL}/users`);

      setIsLoading(false);

      setFeed(data);

      setOffset((prevOffset) => (prevOffset += 20));
    } catch (err: any) {
      setError("Error fectching feed");
      setIsLoading(false);
    }
  }

  async function getMoreFeed() {
    if (isMoreFeed) return;

    try {
      setIsMoreFeed(true);
      const { data } = await axios.get(`${BASE_URL}/users?offset=${offset}`);

      setIsMoreFeed(false);

      if (feed.length) {
        setFeed((prevFeed) => {
          return [...prevFeed, ...data];
        });
      }

      setOffset((prevOffset) => (prevOffset += 20));
    } catch (err: any) {
      setMoreFeedError("Error fectching more feed");
      setIsMoreFeed(false);
    }
  }

  return {
    feed,
    isLoading,
    offset,
    getFeed,
    error,
    isMoreFeed,
    getMoreFeed,
    moreFeedError,
  };
}

export default useFeed;
