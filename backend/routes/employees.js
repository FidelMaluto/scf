import express from "express";
import { cadEmployee, listEmployee, atuaEmployee , apagEmployee} from "../controllers/employee.js";

const route = express.Router();

route.post('/funcionario', cadEmployee);
route.get('/funcionarios', listEmployee);
route.put('/funcionario/edita/:id', atuaEmployee);
route.delete('/funcionario/apaga/:id', apagEmployee);

export default route;
