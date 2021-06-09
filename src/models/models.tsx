export class NotifyModel{
    state: any
    fileName: any
}

export class AudioModel{
    id: number = null!
    fileName: string = null!
    issue: string = null!
    priority: string = null!
    recording: string = null!
    transcript: string = null!
    created: string = null!
    taxonomy: string[] = null!
    status: string = null!

    constructor(id: number, fileName: string, issue: string, priority: string, recording: string, 
        transcript: string, created: string, taxonomy: string[], status: string) {
        this.id = id;
        this.fileName = fileName;
        this.issue = issue;
        this.priority = priority;
        this.recording = recording;
        this.transcript = transcript;
        this.created = created;
        this.taxonomy = taxonomy;
        this.status = status;
    }
}