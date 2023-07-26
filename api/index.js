import express from "express"
import router from "./routes/users.js"
import cors from "cors"
// Módulo CORS, que permite que este aplicativo atenda a requisições de outros domínios.


// Criando uma instância do aplicativo Express.
const app = express();

// Adicionando um middleware que permite que o aplicativo analise corpos de solicitação no formato JSON.
app.use(express.json());

// Adicionando um middleware do CORS, permitindo que o aplicativo atenda a solicitações de outros domínios.
app.use(cors());

// Adicionando um middleware de roteamento, mapeando a rota raiz ("/") para as rotas definidas no arquivo "users.js".
app.use("/", router);

// O aplicativo começa a ouvir por requisições na porta 8800.
app.listen(8800);
