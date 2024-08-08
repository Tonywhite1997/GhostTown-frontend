import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import useFeed from "../apis/useFeed";
import { authContext } from "../contexts/AuthContext";
import Loader from "../UI/Loader";

function Feed() {
  const [isImageLoading, setIsImageLoadng] = useState(true);
  const {
    feed: feeds,
    getFeed,
    isLoading,
    error,
    isMoreFeed,
    getMoreFeed,
    moreFeedError,
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

  return (
    <main className="feed">
      {isLoading && <Loader />}
      {!isLoading && error && <p>{error}</p>}
      <div className="wrapper">
        {feeds.map((feed) => {
          return (
            <Link
              to={`/chats/${feed.id}`}
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

      {feeds.length > 0 && (
        <div className="load-more">
          {
            <button className="load-more-btn" onClick={getMoreFeed}>
              {isMoreFeed ? <Loader /> : " Load more"}
            </button>
          }

          {moreFeedError && <p>{moreFeedError}</p>}
        </div>
      )}
    </main>
  );
}

export default Feed;
