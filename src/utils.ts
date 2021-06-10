import { AudioModel, PaginationModel } from "./models/models";

const parseAudioJsonList = (json: []): AudioModel[] => {
  const audioList: AudioModel[] = [];
  json.forEach((element: any, index: number) => {
    audioList.push(new AudioModel(index, element.fileName, element.issue, element.priority, element.recording,
      element.transcript, element.created, element.taxonomy, element.status))
  });
  return audioList;
}

const parsePaginationJson = (json: any): PaginationModel => {
  return new PaginationModel(json.pageNumber, json.totalRecords, json.firstPage, json.totalPages,
    json.lastPage, json.nextPage);
}

export {
  parseAudioJsonList,
  parsePaginationJson
}