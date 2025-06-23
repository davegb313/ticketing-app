import { OrderCancelledEvent , Publisher, Subjects } from '@daviegb/ticketing-common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
    queueGroupName = 'orders-service';
}