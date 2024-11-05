import { Controller, Get, Req, Post, Delete, Param } from '@nestjs/common';
import { Request } from '@nestjs/common';
@Controller('cats')
export class CatsController {
    @Post()
    create(): string {
        return 'This action adds a new cat';
    }
    @Delete()
    delete(): string {
        return 'This actions deletes a cat'
    }



    @Get(':id')
    findAll(@Param() params: any): string {
        console.log(params.id);
        return `This actions return #${params.id} all cats`;
    }
}
