import { Listener, Subjects, TicketUpdatedEvent } from '@daviegb/ticketing-common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';


export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    queueGroupName: string = 'orders-service';

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const { id, title, price } = data;

        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new Error('ticket not found');
        }
        ticket.set({ title, price });
        await ticket.save();

        msg.ack();
    }
}