export namespace main {
	
	export class IncStats {
	    name: string;
	    total: number;
	    sent: number;
	
	    static createFrom(source: any = {}) {
	        return new IncStats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.total = source["total"];
	        this.sent = source["sent"];
	    }
	}
	export class RecMetadata {
	    name: string;
	    size: number;
	
	    static createFrom(source: any = {}) {
	        return new RecMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.size = source["size"];
	    }
	}
	export class Stats {
	    timeTakenSeconds: string;
	    totalAmountTransferred: string;
	    averageSpeedMiB: string;
	
	    static createFrom(source: any = {}) {
	        return new Stats(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.timeTakenSeconds = source["timeTakenSeconds"];
	        this.totalAmountTransferred = source["totalAmountTransferred"];
	        this.averageSpeedMiB = source["averageSpeedMiB"];
	    }
	}

}

