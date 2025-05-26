"use client";
import { useEffect } from "react";
import { updateSnapchatLink } from "./utils/utils";
const SnapChatButtonClickRotation = () => {
  useEffect(() => {
    const el = document.getElementById("snapchat-link");
    const origin = window.location.origin;
    if (el) {
      el.addEventListener("click", (e) => {
        // Open the link immediately using the current href
        const href = el.getAttribute("href");
        if (href && href !== "#") {
          window.open(href, "_blank");
        }
        // Async fetch and update the link in background (won’t affect this click)
        updateSnapchatLink(origin).then((updateSnapchatRotationData) => {
          if (updateSnapchatRotationData?.activeAccount) {
            el.setAttribute(
              "href",
              `https://www.snapchat.com/add/${updateSnapchatRotationData.activeAccount}`
            );
            console.log(
              `🔗 Updated link for future: ${updateSnapchatRotationData.activeAccount}`
            );
          }
        });

        // Do NOT prevent default — let it work normally
        // Optional: if you prefer to suppress default behavior (e.g. avoid following the old link in same tab), then use window.open and preventDefault.
        e.preventDefault(); // Keep if you want to force opening in _blank
      });

      //   for (let i = 0; i < 50; i++) {
      //     updateSnapchatLink(origin);
      //   }
    }
  }, []);
  return <></>;
};

export default SnapChatButtonClickRotation;
