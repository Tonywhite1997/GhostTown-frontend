import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../apis/useAuth";
import useFeed from "../apis/useFeed";
import { authContext } from "../contexts/AuthContext";
import Loader from "../UI/Loader";

function Feed() {
  const [isImageLoading, setIsImageLoadng] = useState(true);
  const {
    feed: feeds,
    setOffset,
    getFeed,
    isLoading,
    error,
    setError,
  } = useFeed();

  const auth = useContext(authContext);

  function handleImageLoad() {
    setIsImageLoadng(false);
  }

  if (!auth) {
    throw new Error("error occured");
  }

  useEffect(() => {
    if (auth.user?.username) {
      getFeed();
    }
  }, [auth.user?.username]);

  function getMoreFeed() {
    setError("");
    try {
      getFeed();
      // setOffset((prevOffset) => (prevOffset += 20));
    } catch (err) {
      setError("Error fetching more feed");
    }
  }

  return (
    <main className="feed">
      <div className="wrapper">
        {feeds.map((feed) => {
          return (
            <Link
              to={`/chat/user?id=${feed.id}`}
              key={feed.id}
              className="feed-container"
            >
              {isImageLoading && <Loader color="grey" />}
              <div className="img-container">
                <img src={feed.profilePicURL} onLoad={handleImageLoad} />
              </div>

              <p>{feed.username}</p>
            </Link>
          );
        })}
      </div>

      <div className="load-more">
        {
          <button className="load-more-btn" onClick={getMoreFeed}>
            {isLoading ? <Loader /> : " Load more"}
          </button>
        }

        {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default Feed;
