import { useEffect, useState } from "react";

export const useTimeDiffer = (publishedDate: Date) => {
  const [timeDifference, setTimeDifference] = useState("");
  // const [timeDifference, setTimeDifference] = useRecoilState(timeDifferAtom);

  const date: number = new Date().getTime();
  const publishDate: number = new Date(publishedDate).getTime();

  useEffect(() => {
    const calCulateTImeDiff = (publishDate: number) => {
      const diffMiliSeconds = date - publishDate;
      const seconds = Math.floor(diffMiliSeconds / 1000);

      if (seconds < 60) {
        return `${seconds} second${seconds <= 1 ? "" : "s"} ago`;
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes <= 1 ? "" : "s"} ago`;
      } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours <= 1 ? "" : "s"} ago`;
      } else {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days <= 1 ? "" : "s"} ago`;
      }
    };

    const updateTimeInterVal = setInterval(() => {
      const timeDiff = calCulateTImeDiff(publishDate);
      setTimeDifference(timeDiff);
    }, 1000 * 5);
    const timeDiff = calCulateTImeDiff(publishDate);
    setTimeDifference(timeDiff);
    return () => {
      clearInterval(updateTimeInterVal);
    };
  }, []);

  return timeDifference;
};
