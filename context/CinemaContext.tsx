"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CursorType = "default" | "hover-link" | "hover-play";

interface ActiveVideo {
  url: string;
  title: string;
  client: string;
}

interface CinemaContextProps {
  activeVideo: ActiveVideo | null;
  cursorType: CursorType;
  cursorText: string;
  openVideo: (url: string, title: string, client: string) => void;
  closeVideo: () => void;
  setCursor: (type: CursorType, text?: string) => void;
}

const CinemaContext = createContext<CinemaContextProps | undefined>(undefined);

export function CinemaProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState("");

  const openVideo = (url: string, title: string, client: string) => {
    setActiveVideo({ url, title, client });
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  const setCursor = (type: CursorType, text = "") => {
    setCursorType(type);
    setCursorText(text);
  };

  return (
    <CinemaContext.Provider
      value={{
        activeVideo,
        cursorType,
        cursorText,
        openVideo,
        closeVideo,
        setCursor,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
}

export function useCinema() {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error("useCinema must be used within a CinemaProvider");
  }
  return context;
}
