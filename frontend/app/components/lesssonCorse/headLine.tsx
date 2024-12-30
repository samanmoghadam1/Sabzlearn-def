"use client";

import { fetchLeesonByHeadLine } from "@/app/utils/fetchData";
import { short_text } from "@/app/utils/functions";
import Link from "next/link";
import { useEffect, useState } from "react";

const Headline = ({ item }: { item: { title: string; id: number } }) => {
  const [lessons, setLeesons] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchLeesonByHeadLine(item.id);
      setLeesons(response);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div
        onClick={() => setOpen(!open)}
        style={
          !open
            ? { backgroundColor: "rgb(243 244 246)", cursor: "pointer" }
            : {
                backgroundColor: "rgb(100 116 139)",
                cursor: "pointer",
                color: "white",
              }
        }
        className={`p-3 mt-2 ${
          !open ? "rounded-4" : "rounded-top-4"
        } d-flex justify-content-between align-items-center`}
      >
        <span className="h6 fw-bold">{short_text(item.title, 60)}</span>
        <i
          style={{ cursor: "pointer" }}
          className={!open ? "fas fa-chevron-down" : "fas fa-chevron-up"}
        ></i>
      </div>
      {open
        ? lessons.map(
            (
              item: {
                id: number;
                title: string;
                duration: { minutes: number; seconds: number };
              },
              index
            ) => {
              return (
                <div
                  style={{
                    backgroundColor: "rgb(243 244 246)",
                    cursor: "pointer",
                  }}
                  // rgb(243 244 246)
                  // rgb(100 116 139)
                  className="d-flex user-select-none justify-content-between align-items-center p-3 border-bottom  "
                  key={index}
                >
                  <div className="d-flex align-items-center">
                    <span className="d-flex align-items-center px-2 p-1 bg-white ms-3">
                      {index + 1}
                    </span>
                    <Link href={`/lesson/${item.id}`}>
                      <h6>{short_text(item.title, 60)}</h6>
                    </Link>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <span>{`${item.duration.minutes}:${item.duration.seconds}`}</span>
                    <i className="fa-regular fa-circle-play h5"></i>
                  </div>
                </div>
              );
            }
          )
        : null}
    </div>
  );
};

export default Headline;


