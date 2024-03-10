export namespace main {
	
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

