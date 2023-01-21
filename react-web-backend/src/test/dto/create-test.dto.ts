import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto {
    @ApiProperty()
    name : string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    bio: string;
}
