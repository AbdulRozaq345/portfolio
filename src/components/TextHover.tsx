"use client"
import {useEffect,useRef} from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export default function TextHover({value}:{value:number}) {

    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, margin: "-100px"});
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {damping: 40, stiffness: 100});
    
    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }else {
            motionValue.set(0);
        }
    },[isInView, value, motionValue]);

    useEffect(()=> {
        springValue.on("change", (latest) => {
            if(ref.current) {
                ref.current.textContent = Math.floor(latest).toString();
            }
        })
    },[springValue]);



    return (
        <div className=" hidden md:flex text-6xl font-bold flex items-center">
            <span ref={ref}>0</span>
            <span>+</span>
        </div>
    );

}