import { knex as knexConfig } from "knex";

import config from "../../knexfile.js";

const knex = knexConfig(config);

export default knex;
