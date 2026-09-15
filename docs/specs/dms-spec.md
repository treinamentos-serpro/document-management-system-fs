# Especificação - Document Management System

## 1. Objetivo

Fornecer uma aplicação simples para armazenar, listar e baixar documentos de forma segura, mantendo os arquivos no filesystem local da aplicação e os metadados em memória durante a fase inicial do projeto.

## 2. Escopo

### Dentro do escopo

- Upload de documentos em formato genérico
- Listagem de metadados dos documentos enviados
- Download do arquivo armazenado pelo identificador
- Gestão básica por usuário, identificando o dono do documento
- Persistência local do arquivo no diretório da aplicação
- Exposição de endpoints HTTP para operações principais

### Fora do escopo

- Armazenamento externo ou em nuvem
- Versionamento de documentos
- Compartilhamento público ou links temporários
- Autenticação e autorização complexa
- Busca avançada por conteúdo do arquivo
- OCR, preview, marca d’água ou edição de documentos
- Multi-tenancy com isolamento completo de dados entre usuários diferentes

## 3. Requisitos funcionais

| ID | Requisito |
| --- | --- |
| RF-01 | O sistema deve permitir que um usuário envie um documento para o armazenamento local. |
| RF-02 | O upload deve aceitar arquivos em multipart/form-data e preservar o nome original do arquivo. |
| RF-03 | O sistema deve registrar os metadados do documento no momento do upload. |
| RF-04 | O sistema deve permitir a listagem de todos os documentos enviados. |
| RF-05 | A listagem deve retornar os metadados dos documentos e não o conteúdo do arquivo. |
| RF-06 | O sistema deve permitir que um usuário baixe um documento pelo identificador único. |
| RF-07 | O download deve retornar o conteúdo binário do arquivo armazenado. |
| RF-08 | O sistema deve rejeitar solicitações de download de documentos inexistentes com resposta de erro apropriada. |
| RF-09 | Cada documento deve possuir um identificador único e um dono associado. |
| RF-10 | O sistema deve manter o relacionamento entre documento e usuário em metadados para uso simples da aplicação. |
| RF-11 | O sistema deve tratar falhas no upload e no download com respostas HTTP claras e consistentes. |
| RF-12 | O sistema deve evitar uso de nomes arbitrários para o arquivo armazenado, mantendo controle interno do identificador e do caminho local. |

## 4. Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| RNF-01 | Os arquivos enviados devem ser gravados no filesystem local da aplicação usando multer com diskStorage. |
| RNF-02 | Os metadados dos documentos devem ser mantidos em memória nesta fase inicial do projeto. |
| RNF-03 | A aplicação deve ser configurável por variáveis de ambiente, seguindo os princípios de 12-Factor App. |
| RNF-04 | O backend deve seguir a arquitetura em camadas: routes, controllers, services e repositories. |
| RNF-05 | O sistema deve manter baixa complexidade operacional, priorizando clareza e facilidade de manutenção. |
| RNF-06 | O frontend deve conversar com a API via fetch, usando o prefixo /api e sem depender de armazenamento externo. |
| RNF-07 | O sistema deve tratar erros de entrada, ausência de arquivo e documentos inexistentes de maneira previsível. |

## 5. Modelo de dados

### Entidade principal: Documento

| Campo | Tipo | Obrigatório | Descrição |
| --- | --- | --- | --- |
| id | string | Sim | Identificador único do documento. |
| originalName | string | Sim | Nome original do arquivo enviado pelo usuário. |
| storedName | string | Sim | Nome interno usado no armazenamento local para evitar conflitos e proteger o nome original. |
| size | number | Sim | Tamanho do arquivo em bytes. |
| mimeType | string | Não | Tipo MIME do arquivo, quando disponível. |
| uploadedAt | string | Sim | Data e hora do upload em formato ISO 8601. |
| owner | string | Sim | Identificador do usuário ou dono do documento. |
| storagePath | string | Sim | Caminho local do arquivo dentro do diretório de armazenamento. |

## 6. Contratos de API

### POST /upload

- Entrada: arquivo em multipart/form-data
- Saída: metadados  do documento criado

### GET /documents

- Saída: lista de metadados de documentos

### GET /documents/:id/download

- Saída: conteúdo binário do arquivo

## 7. Decisões arquiteturais

- Backend em Clean Architecture simples (routes, controllers, services, repositories)
- Frontend baseado em componentes (React)
- Armazenamento local apenas

## 8. Plano de execução

1. Levantamento e alinhamento de requisitos.
2. Definição do modelo de dados e regras de negócio.
3. Design dos contratos de API.
4. Definição da camada de persistência local.
5. Implementação da arquitetura em camadas.
6. Validação de comportamento principal.
7. Validação de integração com o frontend.
8. Revisão de qualidade e preparação para evolução.
