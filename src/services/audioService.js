// audioService.js
import { BehaviorSubject } from "rxjs";

const audioSubject = new BehaviorSubject(null);

export const setAudioRef = (ref) => {
  audioSubject.next(ref);
};

export const getAudioRef = () => {
  return audioSubject.asObservable();
};
