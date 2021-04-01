import { __prod__ } from "./constants";
import { createConnection } from "typeorm";
import "reflect-metadata";
import ormconfig from "./ormconfig";

const main = async () => {
    const orm = await createConnection( ormconfig );
}
main();

console.log("Hello Wold!");
