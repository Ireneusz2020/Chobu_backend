import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpsertResourceDto {
  @IsString()
  @MaxLength(128)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;
}
