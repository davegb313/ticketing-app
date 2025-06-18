import { Stan } from 'node-nats-streaming';
import { Subjects } from './subjects';

interface Event {
    subject: Subjects;
    data: any;
}

export abstract class Publisher<T extends Event> {
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    private client: Stan;

    constructor(clien: Stan) {
        this.client = clien;
    }

    publish(data: T['data']): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if(err) {
                    return reject(err);
                }
                
                console.log('event published to', this.subject);
                resolve();
            });

        });
    }
}