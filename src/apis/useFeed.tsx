import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../contexts/AuthContext";
import { UserType } from "../types/types";

function useFeed() {
  const [feed, setFeed] = useState<UserType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<string>("");

  async function getFeed() {
    setIsLoading(true);

    try {
      const { data } = await axios.get(`${BASE_URL}/users?offset=${offset}`);

      setIsLoading(false);

      if (feed.length) {
        setFeed((prevFeed) => {
          return [...prevFeed, ...data];
        });
      } else {
        setFeed(data);
      }

      setOffset((prevOffset) => (prevOffset += 20));
    } catch (err: any) {
      console.error(err);
      setError("Error fectching more feed");
      setIsLoading(false);
    }
  }
  return { feed, isLoading, offset, setOffset, getFeed, error, setError };
}

export default useFeed;
