
/**
 * The Receiver
 * Object with the 'actions' that can be requested. 
 * Does the work when the execute() method of the 
 * Command object is called
*/
class Chef {

    constructor(public name: string) { }

    cookPasta() {
        console.log(`${this.name} is Cooking pasta`)
    }

    bakeCake() {
        console.log(`${this.name} is baking cake`)
    }
}
/**
 * The Command interface
 */
interface Command {
    execute(): void;
}


/**
 * Command object 
 * Knows about the Receiver and Invokes a method on the Receiver
 */
class CookPastaCommand implements Command {

    private theChef: Chef;

    constructor(c: Chef) {
        this.theChef = c;
    }

    execute() {
        this.theChef.cookPasta();
    }
}


class BakeCakeCommand implements Command {

    private theChef: Chef;

    constructor(c: Chef) {
        this.theChef = c;
    }

    execute() {
        this.theChef.bakeCake();
    }
}

/**
 * The Invoker 
 * Object knows how to execute a Command.
 * The Invoker does not know anything about a concrete command, 
 * it knows only about the command interface.
 */
class Waiter {

    constructor() {
    }

    takeOrder(order: Array<Command>) {
        order.forEach(item => item.execute())
    }

}


/**
 * The Client
 * Holds the Invoker, Command and Receiver objects 
 * The client decides which receiver objects it assigns to the command objects, 
 * and which commands it assigns to the invoker. 
 * The client decides which commands to execute at which points. 
 * To execute a command, it passes the command object to the invoker object.
 */

class Client {

    private chefOnDuty: Chef = new Chef('Jane');
    private bakerOnDuty: Chef = new Chef('Bill');
    private theWaiter: Waiter = new Waiter();
    private orderCommands: Array<Command> = [];

    constructor(public name: string) { }

    order(orderItem: string): void {

        if (orderItem === 'pasta') {
            this.orderCommands.push(new CookPastaCommand(this.chefOnDuty));
        }
        else if (orderItem == 'cake') {
            this.orderCommands.push(new BakeCakeCommand(this.bakerOnDuty));
        }
        else {
            console.log(`Sorry ${this.name}, ${orderItem} is not currently available. We have pasta or cake`);
        }
    }

    orderComplete(): void {
        if (this.orderCommands.length > 0) {
            this.theWaiter.takeOrder(this.orderCommands);
        } else {
            console.log(`Sorry ${this.name}, please order either pasta or cake`);
        }
    }
}

const bob = new Client('Bob');
bob.order('pasta');
bob.order('cake');
bob.order('drink')
bob.orderComplete();