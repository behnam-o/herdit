import { Connection } from "typeorm";

export type MyContext = {
    orm: Connection
}