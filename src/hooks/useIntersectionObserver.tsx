import { RefObject } from "react";

type Props = {
  ref: RefObject<HTMLElement>;
  runOnce: boolean;
  options: IntersectionObserverInit;
};

export default function useIntersectionObserver({}: Props) {
    
}
