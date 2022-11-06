export class Mutex {
    private queue: Array<() => void> = [];
    private locked: boolean = false;
    
    lock() {
        return new Promise<void>(resolve => {
            this.queue.push(resolve);
            this.next();
        });
    }
    
    private next() {
        if (this.queue.length > 0 && !this.locked) {
            this.locked = true;
            this.queue.shift()!();
        }
    }
    
    unlock() {
        this.locked = false;
        this.next();
    }
}