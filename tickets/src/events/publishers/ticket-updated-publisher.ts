import { Publisher, Subjects, TicketUpdatedEvent } from '@daviegb/ticketing-common';


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName = 'tickets-service';
}