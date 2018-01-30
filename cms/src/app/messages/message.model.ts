export class Message {
  public messageId: string;
  public subject: string;
  public msgText: string;
  public sender: string;

  constructor(messageId: string, subject: string, msgText: string, sender: string){
    this.messageId = messageId;
    this.subject = subject;
    this.msgText = msgText;
    this.sender = sender;
  }
}
