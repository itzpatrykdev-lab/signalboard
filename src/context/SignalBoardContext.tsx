import { createContext, useContext } from "react";
import {
  contentItems as initialContentItems,
  screens as initialScreens,
} from "../data/mockSignageData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
  ContentItem,
  ContentStatus,
  SignageScreen,
} from "../types/signage";

interface SignalBoardContextValue {
  contentItems: ContentItem[];
  screens: SignageScreen[];
  setContentStatus: (contentId: string, status: ContentStatus) => void;
  setScreenPlaylist: (screenId: string, playlistId: string | null) => void;
}

const SignalBoardContext = createContext<SignalBoardContextValue | undefined>(
  undefined,
);

export function SignalBoardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screens, setScreens] = useLocalStorage<SignageScreen[]>(
    "signalboard-screens",
    initialScreens,
  );

  const [contentItems, setContentItems] = useLocalStorage<ContentItem[]>(
    "signalboard-content-items",
    initialContentItems,
  );

  function setScreenPlaylist(screenId: string, playlistId: string | null) {
    setScreens((currentScreens) =>
      currentScreens.map((screen) =>
        screen.id === screenId
          ? { ...screen, activePlaylistId: playlistId }
          : screen,
      ),
    );
  }

  function setContentStatus(contentId: string, status: ContentStatus) {
    setContentItems((currentItems) =>
      currentItems.map((item) =>
        item.id === contentId ? { ...item, status } : item,
      ),
    );
  }

  return (
    <SignalBoardContext.Provider
      value={{
        contentItems,
        screens,
        setContentStatus,
        setScreenPlaylist,
      }}
    >
      {children}
    </SignalBoardContext.Provider>
  );
}

export function useSignalBoard() {
  const context = useContext(SignalBoardContext);

  if (!context) {
    throw new Error(
      "useSignalBoard must be used inside a SignalBoardProvider.",
    );
  }

  return context;
}
