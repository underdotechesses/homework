export default class EventSource {
    static createEvent(name, data, target) {
        return {name, data, target};
    }

    constructor() {
        this.events = {};
    }

    addEventListener(eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
    
        this.events[eventName].push(callback);
    };
}