"use client";
import { useState } from "react";
import { Play, ArrowUpRight } from "@phosphor-icons/react";
export function VideoPlayer({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="video-player">
      {play ? (
        <iframe
          src={"https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1"}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button onClick={() => setPlay(true)} aria-label={"Play " + title}>
          <img
            src={"https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"}
            alt=""
            loading="lazy"
          />
          <span>
            <Play weight="fill" size={23} />
          </span>
        </button>
      )}
    </div>
  );
}
export function ReelPlayer({ id, title }: { id: string; title: string }) {
  const [load, setLoad] = useState(true);
  return (
    <div className="reel-player">
      {load ? (
        <iframe
          src={"https://www.instagram.com/p/" + id + "/embed/"}
          title={title}
          loading="lazy"
          allow="encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className="reel-consent">
          <span className="micro">INSTAGRAM / @JUSTCHANDAN__</span>
          <h3>{title}</h3>
          <button className="studio-button" onClick={() => setLoad(true)}>
            <Play size={17} /> Load reel
          </button>
          <p>
            Loads the original Instagram player. Instagram may require sign-in.
          </p>
        </div>
      )}
      <a
        href={"https://www.instagram.com/justchandan__/reel/" + id + "/"}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open original reel <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
