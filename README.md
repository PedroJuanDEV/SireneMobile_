# 🚨 SIRENE

> Projeto Integrador desenvolvido para o Corpo de Bombeiros Militar de Pernambuco (CBMPE) no curso de Análise e Desenvolvimento de Sistemas da Faculdade Senac Pernambuco.

##  Sobre o Projeto

O **SIRENE** é uma solução tecnológica desenvolvida para modernizar o processo de registro de ocorrências do CBMPE. O sistema substitui o modelo manual e fragmentado atual por um aplicativo mobile multiplataforma (Android, iOS, PWA) e um painel web administrativo.

O principal objetivo é padronizar a coleta de dados em campo, garantindo agilidade e segurança, mesmo em locais sem conexão com a internet (Modo Offline).


## 📱 Funcionalidades (App Mobile)

O aplicativo de campo foi projetado com foco na usabilidade para os operadores (Tenentes e Soldados):

* **Autenticação Segura:** Login com credenciais institucionais e perfis de acesso (Operador, Chefe, Admin).
* **Registro de Ocorrências:** Formulário padronizado com validação de campos obrigatórios.
* **Modo Offline:** Armazenamento local (cache) e fila de sincronização automática.
* **Geolocalização:** Captura automática de coordenadas GPS e carimbo de data/hora.
* **Evidências Multimídia:** Captura e compressão de fotos e vídeos diretamente no app.
* **Assinatura Digital:** Coleta de assinatura dos envolvidos na tela do dispositivo.
* **Minhas Ocorrências:** Histórico de registros do usuário com status de sincronização.

## 🛠️ Arquitetura e Tecnologias

O projeto utiliza uma **Arquitetura Não Monolítica** baseada em serviços para garantir escalabilidade:

### Front-end (Mobile & Web)
* **Framework:** React
* **Build Tool:** Vite
* **Linguagem:** JavaScript/TypeScript

### Back-end (API & Serviços)
* **Runtime:** Node.js
* **Framework:** Express
* **Linguagem:** TypeScript


## 👥 Equipe de Desenvolvimento

| Papel | Responsável |
| :--- | :--- |
| **Gestor de ProjetosI** | Gabriel Gleydson Lima dos Santos |
| **Design UX/UI** | Ana Carolina da Silva Santos |
| **Dev Front-End** | Pedro Juan Pereira dos Santos |
| **Dev Back-End / Banco de Dados** | Muriel Bezerra da Silva |
| **Pesquisa / QA** | Edmael Paulo Ribeiro Barreto |
| **Pesquisa** | Wanderson Phillype Felix Pereira |

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js (v16 ou superior)
* NPM ou Yarn
* MongoDB rodando localmente ou via Atlas

### Passos
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/PedroJuanDEV/SireneMobiel.git](https://github.com/PedroJuanDEV/SireneMobiel.git)
    cd SireneMobiel
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz baseado no `.env.example`.

4.  **Execute o projeto em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```

## 📄 Licença

Desenvolvido para fins acadêmicos na Faculdade Senac Pernambuco - 2025.
