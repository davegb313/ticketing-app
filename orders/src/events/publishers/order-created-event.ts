import { OrderCreatedEvent, Publisher, Subjects } from '@daviegb/ticketing-common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = 'orders-service';
}