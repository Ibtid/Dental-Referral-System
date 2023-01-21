import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTestDto } from './create-test.dto';

export class UpdateTestDto extends PartialType(CreateTestDto) {
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
