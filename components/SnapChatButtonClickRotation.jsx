"use client";
import { useEffect } from "react";
import { updateSnapchatLink } from "./utils/utils";
const SnapChatButtonClickRotation = () => {
  useEffect(() => {
    const el = document.getElementById("snapchat-link");
    if (el) {
      el.addEventListener("click", async (e) => {
        e.preventDefault();
        const updateSnapchatRotationData = await updateSnapchatLink();
        if (el) {
          el.setAttribute(
            "href",
            `https://www.snapchat.com/add/${updateSnapchatRotationData.account}`
          );
          console.log(
            `🔗 Nastaven účet: ${updateSnapchatRotationData.account}`
          );
        }
        const href = el.getAttribute("href");
        if (href && href !== "#") {
          window.open(href, "_blank");
        }
      });
    }
  }, []);
  return <></>;
};

export default SnapChatButtonClickRotation;
