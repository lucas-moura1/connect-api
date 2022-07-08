# connect-api

Uma API REST em Node.JS onde é usado o Express como web framework, MySQL como banco de dados e Jest para os testes unitários e integrados. A finalidade desta é para suprir uma necessidade da igreja Lagoinha Niterói de registrar os dados dos adolecentes, crianças e seus responsáveis no culto sem ter que preencher novamente todos os dados a cada culto. E sim, realizar o cadastro do adolecente/criança(connect) e responsáveis apenas uma vez, e associar os dados deles ao culto em específico.

Então, a API recebe os dados fornecidos por um client, trata-os, salva no banco e fornece um JSON como resposta.

Tecnologias utilizadas:

- **Node.Js** com ECMAScript modules;
- **Express** como framework web;
- **Sequelize** para **MySQL**;
- **Eslint** e **Prettier** (JavaScript Standard como Style guide);
- **Jest** para os testes unitários e integrados;
- **Winston** para os logs;
- **Yup** para as validações dos dados de entrada do client;
- **Babel** para auxiliar o Jest na hora de executar os testes por conta da utilização do ECMAScript modules.

## Modelo de Endidade

### Culto
```
id: <string>
data: <string>
horario: <enum(10h|18h|20h)>
ConnectId: <Connect>
```

### Responsavel
```
id: <string>
nome: <string>
telefone: <string>
grupoPais: <boolean>
```
### Connect
```
id: <string>
nome: <string>
dataNascimento: <string>
responsavelId: <Responsavel>
```

## Funcionalidades da API

### Culto
- Criação;
- Listagem de todos os dados;
- Listagem por id.

### Connect
- Criação;
- Listagem de todas os dados;
- Listagem por nome.

### Responsavel
- Criação.

## Rotas

### Culto
#### Criação
```
Endpoint: /cult
Method: POST
Headers: {
    "Content-Type": "application/json"
}
Query: {}
Params: {}
Body: {
    "data": yyyy-mm-dd,
	"horario": "10h"
}

Response: {
    status: 200,
    body: {
        "id": <id>,
        "data": <date>,
        "horario": <string>,
        "updatedAt": <datetime>,
        "createdAt": <datetime>
    }
}
```
#### Listagem de todos dados

```
Endpoint: /cult
Method: GET
Headers: {}
Query: {}
Params: {}
Body: {}

Response: {
    status: 200,
    body: [
        {
            "id": <int>,
            "data": <date>,
            "horario": <string>,
            "connects": [<Connect>]
            "createdAt": <datetime>,
            "updatedAt": <datetime>
        }
    ]
}
```

#### Listagem por id

```
Endpoint: /cult
Method: GET
Headers: {}
Query: {
    relationship: <boolean> optional
}
Params: {
    id: <int> required
}
Body: {}

Response: {
    status: 200,
    body: [
        {
            "id": <int>,
            "data": <date>,
            "horario": <string>,
            "connects": [
                <Connect>,
                <Responsavel>
            ]
            "createdAt": <datetime>,
            "updatedAt": <datetime>
        }
    ]
}
```

### Connect
#### Criação
```
Endpoint: /connect
Method: POST
Headers: {
    "Content-Type": "application/json"
}
Query: {}
Params: {}
Body: {
	"cultoId": 1,
	"numeroPulseira": 1290,
	"connect": {
		"nome": "Lucas",
		"dataNascimento": yyyy-mm-dd,
		"telefone": "xxxxxxxxxxx",
		"responsavels": [{
			"nome": "Lucas",
			"telefone": "xxxxxxxxxxx",
			"grupoPais": true
		}]
	},
	"observacoes": <string>
}

Response: {
    status: 200,
    body: [
	{
		"numeroPulseira": <int>,
		"observacoes": <string>,
		"connectId": <int>,
		"cultoId": <int>,
		"createdAt": <datetime>,
		"updatedAt": <datetime>
	}
]
}
```
#### Listagem de todos dados

```
Endpoint: /connect
Method: GET
Headers: {}
Query: {}
Params: {}
Body: {}

Response: {
    status: 200,
    body: [
        {
            "id": <int>,
            "nome": <date>,
            "dataNascimento": <date>,
            "telefone": <string>,
            "responsavels": [<Connect>]
            "createdAt": <datetime>,
            "updatedAt": <datetime>
        }
    ]
}
```

#### Listagem por nome

```
Endpoint: /connect/:name
Method: GET
Headers: {}
Query: {}
Params: { "name": <string>}
Body: {}

Response: {
    status: 200,
    body: [{
            "id": <int>,
            "nome": <date>,
            "dataNascimento": <date>,
            "telefone": <string>,
            "responsavels": [<Connect>]
            "createdAt": <datetime>,
            "updatedAt": <datetime>
    }]
}
```

### Responsavel
#### Criação
```
Endpoint: /responsable
Method: POST
Headers: {
    "Content-Type": "application/json"
}
Query: {}
Params: {}
Body: {
    "nome": "Lucas",
    "telefone": "xxxxxxxxxxx",
    "grupoPais": true
}

Response: {
    status: 200,
    body: [
	{
		"id": <int>,
		"nome": <string>,
		"telefone": <string>,
        "grupoPais": <boolean>,
		"createdAt": <datetime>,
		"updatedAt": <datetime>
	}
]
}
```

### ConnectCulto
#### Associação de um connect existente a um culto
```
Endpoint: /connectCult
Method: POST
Headers: {
    "Content-Type": "application/json"
}
Query: {}
Params: {}
Body: {
    "cultoId": 2,
	"numeroPulseira": 1350,
	"connectId": 1,
	"observacoes": ""
}

Response: {
    status: 200,
    body: [
	{
		"numeroPulseira": <int>,
		"observacoes": <string>,
		"connectId": <int>,
		"cultoId": <int>,
		"createdAt": <datetime>,
		"updatedAt": <datetime>
	}
]
}
```

## Execução do projeto

Para a execução do projeto é necessário ter instalado na máquina o `Docker e docker-compose`.

### Comandos

#### Executar localmente

- `git clone <url_repositorio>` : clonar o repositório;
- `docker-compose up`: rodar a aplicação.

Para acessar a API diretamente é preciso acessar http://localhost:8888 + o endpoint.

Ex: http://localhost:8888/heath

#### Para executar os testes

Para rodar os testes unitários e integrados é preciso seguir os seguintes comandos abaixo:

- Alterar a variável de ambiente chamado `NODE_ENV` dentro do arquivo [docker-compose.yml](docker-compose.yml) de development para `test`;
- `docker-compose up` para rodar a aplicação;
- Abra uma nova aba no terminal e execute `docker ps` para obter `id` do container da API REST;
- `docker exec -it connect_api bash` para executar o bash e "entrar" no container da aplicação principal;
- `yarn test` para executar os testes.

