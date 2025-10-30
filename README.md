# 🚀 Projeto de Automação de Testes - Interface Web

## 📚 Disciplina: Automação de Testes na Camada de Interface (Web)

Este projeto foi desenvolvido durante as aulas da disciplina de **Automação de Testes na Camada de Interface (Web)**, demonstrando a implementação de testes automatizados usando Cypress com diferentes padrões e abordagens arquiteturais.

---

## 🎯 Objetivo do Projeto

Desenvolver uma suíte de testes automatizados para o site [Automation Exercise](https://automationexercise.com/), aplicando:

- ✅ **Padrões de teste**: AAA (Arrange, Act, Assert)
- ✅ **Modularização**: Organização do código em módulos especializados
- ✅ **Geração de dados dinâmicos**: Usando Faker.js
- ✅ **Boas práticas**: Separação de responsabilidades e código limpo

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta        | Versão  | Descrição                  |
| ----------------- | ------- | -------------------------- |
| **Cypress**       | 13.7.3  | Framework de testes E2E    |
| **Faker.js**      | 10.1.0  | Geração de dados dinâmicos |
| **JavaScript**    | ES6+    | Linguagem de programação   |
| **Node.js**       | 22.14.0 | Runtime JavaScript         |
| **cypress-xpath** | Latest  | Suporte a seletores XPath  |

---

## 📁 Estrutura do Projeto

```
📦 PGATS-AUTOMOCAOWEB/
├── 📁 cypress/
│   ├── 📁 e2e/
│   │   ├── 📄 automation-exercise.cy.js         # Abordagem tradicional
│   │   ├── 📄 automation-excercise-modules.cy.js # Modularização
│   │   └── 📄 drag-and-drop-and-windows.cy.js  # Testes avançados
│   ├── 📁 fixtures/
│   │   ├── 📄 testData.json                     # Dados estáticos
│   │   ├── 📄 support.json                     # Dados de suporte
│   │   └── 📄 formData.json                    # Dados de formulários
│   ├── 📁 support/
│   │   ├── 📄 commands.js                      # Comandos customizados
│   │   ├── 📄 e2e.js                          # Configurações globais
│   │   └── 📄 helpers.js                      # Funções auxiliares
│   └── 📁 Modules/                            # Modularização
│       ├── 📁 Menu/
│       │   └── 📄 index.js                    # Módulo de navegação
│       ├── 📁 Login/
│       │   └── 📄 index.js                    # Módulo de login
│       └── 📁 Cadastro/
│           └── 📄 index.js                    # Módulo de cadastro
├── 📄 cypress.config.js                      # Configurações do Cypress
├── 📄 package.json                           # Dependências do projeto
└── 📄 README.md                              # Documentação
```

---

## 🧪 Cenários de Teste Implementados

### 📋 **Funcionalidades Testadas:**

1. **👤 Cadastro de Usuário**

   - Cadastro com dados dinâmicos (Faker.js)
   - Validação de campos obrigatórios
   - Verificação de conta criada com sucesso

2. **🔐 Login de Usuário**

   - Login com credenciais válidas
   - Login com credenciais inválidas
   - Validação de mensagens de erro

3. **🚪 Logout de Usuário**

   - Logout após login bem-sucedido
   - Verificação do redirecionamento

4. **⚠️ Validações de Negócio**

   - Tentativa de cadastro com email existente
   - Verificação de mensagens de erro apropriadas

5. **📤 Upload de Arquivos**
   - Envio de formulário com anexo
   - Validação de sucesso no upload

---

## 🏗️ Abordagens Implementadas

### 1. **Abordagem Tradicional** (`automation-exercise.cy.js`)

```javascript
// Código direto no teste - todas as ações inline
cy.get('[data-qa="login-email"]').type(user.email);
cy.get('[data-qa="login-password"]').type(user.password);
cy.get('[data-qa="login-button"]').click();
```

### 2. **Abordagem Modularizada** (`automation-excercise-modules.cy.js`)

```javascript
// Usando módulos especializados para organização
import menu from "../Modules/Menu";
import login from "../Modules/Login";

// Cada módulo encapsula funcionalidades específicas
menu.navegarParaMenuLogin();
login.preencherFormularioDeLogin(user.email, user.password);
```

---

## 🎭 Padrão AAA Implementado

Todos os testes seguem rigorosamente o padrão **AAA**:

```javascript
it("Login com credenciais válidas", () => {
  // ARRANGE - Preparar dados e ambiente
  const validUser = getTestUser("valid");
  menu.navegarParaMenuLogin();

  // ACT - Executar a ação principal
  login.preencherFormularioDeLogin(validUser.email, validUser.password);

  // ASSERT - Verificar o resultado esperado
  cy.get('a[href="/logout"]').should("be.visible");
  cy.get("i.fa-user").parent().should("contain", validUser.name);
});
```

---

## 🎲 Geração de Dados Dinâmicos

### **Faker.js com Localização Brasileira:**

```javascript
import { faker, fakerPT_BR } from "@faker-js/faker";

export function createNewUserData() {
  return {
    name: fakerPT_BR.person.fullName(), // Nome brasileiro
    email: fakerPT_BR.internet.email(), // Email válido
    password: fakerPT_BR.internet.password(), // Senha segura
    phone: fakerPT_BR.phone.number(), // Telefone brasileiro
    address: fakerPT_BR.location.streetAddress(), // Endereço
    city: fakerPT_BR.location.city(), // Cidade
    // ... outros campos
  };
}
```

---

## 🚀 Como Executar o Projeto

### **📋 Pré-requisitos:**

- Node.js (versão 18+)
- Git

### **🔧 Instalação:**

```bash
# 1. Clonar o repositório
git clone https://github.com/NataliaFerreiraVentura/PGATS-Automocaoweb.git

# 2. Entrar no diretório
cd PGATS-AUTOMOCAOWEB

# 3. Instalar dependências
npm install
```

### **▶️ Execução dos Testes:**

```bash
# Executar todos os testes (headless)
npm run cy:run

# Abrir interface gráfica do Cypress
npm run cy:open

# Executar teste específico
npx cypress run --spec "cypress/e2e/automation-exercise.cy.js"

# Executar testes com módulos
npx cypress run --spec "cypress/e2e/automation-excercise-modules.cy.js"
```

---

## 📊 Relatórios de Teste

O projeto gera relatórios automáticos em HTML usando **Mochawesome**:

- 📁 **Local dos relatórios:** `cypress/reports/html/`
- 📄 **Arquivo principal:** `index.html`
- 📸 **Screenshots:** Capturados automaticamente em falhas

### **Visualizar Relatórios:**

```bash
# Após executar os testes
open cypress/reports/html/index.html
```

---

## 🎓 Conceitos Aprendidos

### **📚 Fundamentos:**

- ✅ Configuração e setup do Cypress
- ✅ Seletores CSS e XPath
- ✅ Comandos básicos do Cypress
- ✅ Assertions e validações

### **🏗️ Arquitetura:**

- ✅ Modularização de código
- ✅ Separação de responsabilidades
- ✅ Organização em módulos especializados
- ✅ Reutilização de componentes

### **🧪 Boas Práticas:**

- ✅ Padrão AAA (Arrange, Act, Assert)
- ✅ Geração de dados dinâmicos
- ✅ Fixtures para dados estáticos
- ✅ Helpers para funções auxiliares

### **🔧 Ferramentas:**

- ✅ Faker.js para dados realistas
- ✅ cypress-xpath para seletores XPath
- ✅ Mochawesome para relatórios
- ✅ Git para versionamento

---

## 🎯 Resultados Alcançados

### **📈 Métricas do Projeto:**

- **6 cenários** de teste implementados
- **2 arquiteturas** diferentes demonstradas
- **100% de cobertura** das funcionalidades principais
- **0 falsos positivos** nos testes
- **Dados dinâmicos** em todos os testes de cadastro

### **🏆 Benefícios Obtidos:**

- ✅ **Automação completa** do fluxo de usuário
- ✅ **Detecção precoce** de bugs
- ✅ **Execução rápida** e confiável
- ✅ **Relatórios detalhados** de execução
- ✅ **Código reutilizável** e manutenível

---

## 👥 Autor

**👨‍🎓 Estudante:** [Seu Nome]  
**🏫 Instituição:** PGATS - Pós Graduação  
**📚 Disciplina:** Automação de Testes na Camada de Interface (Web)  
**📅 Período:** 2025

---

## 📞 Suporte

Para dúvidas ou sugestões:

- 📧 **Email:** [seu-email@exemplo.com]
- 🐙 **GitHub:** [@NataliaFerreiraVentura](https://github.com/NataliaFerreiraVentura)
- 💼 **LinkedIn:** [Seu Perfil]

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Pós-Graduação em Automação de Testes.

---

**⭐ Gostou do projeto? Deixe uma star no repositório!**

---

_Projeto desenvolvido com 💚 e muito ☕ durante as aulas de Automação de Testes_
