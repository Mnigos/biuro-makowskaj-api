export interface CreateAssigmentDto {
  readonly _id?: string;
  readonly title: string;
  readonly description: string;
  readonly image?: string;
  readonly createdAt?: Date;
}
