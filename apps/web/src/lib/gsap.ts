"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Observer, useGSAP);

export { gsap, ScrollTrigger, Observer, useGSAP };
