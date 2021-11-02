export class PostForm {
  private content: string;
  private status: string;
  private imageUrl: string;
  private created_date: any;
  private modified_date: any;

  constructor(content: string, status: string, imageUrl: string) {
    this.content = content;
    this.status = status;
    this.imageUrl = imageUrl;
  }
}
