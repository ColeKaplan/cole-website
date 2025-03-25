import { Unity, useUnityContext } from "react-unity-webgl";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ReactUnityProps {
  loaderUrlProp: string;
  dataUrlProp: string;
  frameworkUrlProp: string;
  codeUrlProp: string;
}

export default function ReactUnity({
  loaderUrlProp,
  dataUrlProp,
  frameworkUrlProp,
  codeUrlProp
}: ReactUnityProps) {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: loaderUrlProp,
    dataUrl: dataUrlProp,
    frameworkUrl: frameworkUrlProp,
    codeUrl: codeUrlProp,
  });

  const loadingPercentage = Math.round(loadingProgression * 100);

  return (
    <div className="">
      <a href="/" className={`hover:text-[#A0BEE6] absolute w-[3dvw] h-[3dvw] ml-[.3dvw] mt-[.3dvw]`}>
        <Image src="/favicon/favicon-32x32.png" alt={`ColeKaplan Logo`} fill></Image>
      </a>
      {isLoaded === false && (
        <div className="loading-overlay text-white text-8xl flex justify-center items-center w-full h-[90vh]">
          <p>Loading... ({loadingPercentage}%)</p>
        </div>
      )}
      <Unity unityProvider={unityProvider} style={{ width: "99.9vw", overflow: "hidden" }} />
    </div>
  );
}