import { DomainException } from "src/Domain/exceptions/domain.exception";
import { ExceptionHandler } from "./exception.handler";
import { DomainExceptionHandler } from "./handlers/domain.exception.handler";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ControllerAdvice {
    private handlers: Map<string, ExceptionHandler<Error>>
    constructor(){
        this.handlers = new Map();

        this.registerHandlers();  
    }

    private registerHandlers(){
        this.handlers.set(DomainException.name, new DomainExceptionHandler());
    }

    public handle(exception: Error): void {
        const handler = this.handlers.get(exception.name);
        if(handler){
            handler.handle(exception);
        } else {
            console.log(`Handler not found for exception ${exception.name}`);
        }
    }

}