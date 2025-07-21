import { ExpirationCompleteEvent, Publisher, Subjects } from '@daviegb/ticketing-common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    queueGroupName = 'expiration-service';
}