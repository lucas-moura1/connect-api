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
- Listagem de todas os dados.

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
    "data": "dd/mm/yyyy",
	"horario": "10h"
}

Response: {
    status: 200,
    body: {
        "id": <id_banco>,
        "data": "dd/mm/yyyy",
        "horario": "10h",
        "updatedAt": <data_criação>,
        "createdAt": <data_última_atualização>
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
            "id": 1,
            "data": "dd/mm/yyyy",
            "horario": "10h",
            "connects": [<Connect>]
            "createdAt": <data_criação>,
            "updatedAt": <data_última_atualização>
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
            "id": 1,
            "data": "dd/mm/yyyy",
            "horario": "10h",
            "connects": [
                <Connect>,
                <Responsavel>
            ]
            "createdAt": <data_criação>,
            "updatedAt": <data_última_atualização>
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
		"dataNascimento": "dd/mm/yyyy",
		"telefone": "xxxxxxxxxxx",
		"responsavels": [{
			"nome": "Lucas",
			"telefone": "xxxxxxxxxxx",
			"grupoPais": true
		}]
	},
	"observacoes": ""
}

Response: {
    status: 200,
    body: [
	{
		"numeroPulseira": 1290,
		"observacoes": "",
		"connectId": <int>,
		"cultoId": 1,
		"createdAt": "2022-03-31T00:44:01.088Z",
		"updatedAt": "2022-03-31T00:44:01.088Z"
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
            "id": 1,
            "nome": "dd/mm/yyyy",
            "dataNascimento": "dd/mm/yyyy",
            "telefone": "xxxxxxxxxxx",
            "responsavels": [<Connect>]
            "createdAt": <data_criação>,
            "updatedAt": <data_última_atualização>
        }
    ]
}
```

#### Listagem por telefone

```
Endpoint: /connect/:phone
Method: GET
Headers: {}
Query: {}
Params: { "phone": "xxxxxxxxxxx"}
Body: {}

Response: {
    status: 200,
    body: {
            "id": 1,
            "nome": "dd/mm/yyyy",
            "dataNascimento": "dd/mm/yyyy",
            "telefone": "xxxxxxxxxxx",
            "responsavels": [<Connect>]
            "createdAt": <data_criação>,
            "updatedAt": <data_última_atualização>
    }
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
}

Response: {
    status: 200,
    body: [
	{
		"id": <int>,
		"nome": "Lucas",
		"telefone": "xxxxxxxxxxx",
        "grupoPais": true,
		"createdAt": "2022-03-31T00:44:01.088Z",
		"updatedAt": "2022-03-31T00:44:01.088Z"
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
