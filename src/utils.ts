import { AudioModel } from "./models/models";

const parseAudioJsonList = (json: []): AudioModel[] => {
  console.log('in')
  const audioList: AudioModel[] = [];
  json.forEach((element: any, index: number) => {
    audioList.push(new AudioModel(index, element.fileName, element.issue, element.priority, element.recording,
      element.transcript, element.created, element.taxonomy, element.status))
  });
  return audioList;
}

export {
  parseAudioJsonList
}