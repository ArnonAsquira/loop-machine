interface IAudioFileObj {
  fileName: string;
  content: string;
}

interface IAudioElementObj {
  name: string;
  element: HTMLAudioElement;
}

export type { IAudioFileObj, IAudioElementObj };
