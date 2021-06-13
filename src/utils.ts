import { AudioModel, PaginationModel } from "./models/models";

const parseAudioJsonList = (json: []): AudioModel[] => {
  const audioList: AudioModel[] = [];
  json.forEach((element: any, index: number) => {
    audioList.push(new AudioModel(index, element.fileName, element.issue, element.priority,
      element.transcript, element.created, element.taxonomy, element.status))
  });
  return audioList;
}

const parsePaginationJson = (json: any): PaginationModel => {
  return new PaginationModel(json.pageNumber, json.totalRecords, json.firstPage, json.totalPages,
    json.lastPage, json.nextPage, json.previousPage);
}

const parseAudioJson = (json: any) => {
  return new AudioModel(1, json.fileName, json.issue, json.priority, json.transcript, json.created,
    json.taxonomy, json.status);
}

export {
  parseAudioJsonList,
  parsePaginationJson,
  parseAudioJson
}