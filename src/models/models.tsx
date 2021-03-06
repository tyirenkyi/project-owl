export interface NotifyModel{
    State: any
    FileName: any
}

export class AudioModel{
    id: number = null!
    fileName: string = null!
    issue: string = null!
    priority: string = null!
    transcript: string = null!
    created: string = null!
    taxonomy: string[] = null!
    status: string = null!

    constructor(id: number, fileName: string, issue: string, priority: string, 
        transcript: string, created: string, taxonomy: string[], status: string) {
        this.id = id;
        this.fileName = fileName;
        this.issue = issue;
        this.priority = priority;
        this.transcript = transcript;
        this.created = created;
        this.taxonomy = taxonomy;
        this.status = status;
    }
}

export class PaginationModel{
    pageNumber: number = null!
    totalRecords: number = null!
    firstPage: string = null!
    totalPages: number = null!
    lastPage: string = null!
    nextPage?: string = null!
    previousPage?: string = null!

    constructor(pageNumber: number, totalRecords: number, firstPage: string, 
        totalPages: number, lastPage: string, nextPage?: string, previousPage?: string) {
        this.pageNumber = pageNumber;
        this.totalRecords = totalRecords;
        this.firstPage = firstPage;
        this.totalPages = totalPages;
        this.lastPage = lastPage;
        this.nextPage = nextPage;
        this.previousPage = previousPage
    }

    static emptyInstance() {
        return new PaginationModel(1, 1, '', 1, '', null!, null!);
    }
}