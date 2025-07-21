import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from '@daviegb/ticketing-common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expiration-queue';


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = 'expiration-service';

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
        console.log('waiting this many milliseconds to process the job', delay);
        

        await expirationQueue.add({
            odrderId: data.id
        },{
            delay,
        });

        msg.ack();
    }
}