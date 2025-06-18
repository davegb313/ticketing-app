import { Publisher, Subjects, TicketCreatedEvent } from '@daviegb/ticketing-common';


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'tickets-service';
}